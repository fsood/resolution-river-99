import React, { useState, useEffect } from "react";
import { TicketHeader } from "./tickets/TicketHeader";
import { TicketSearch } from "./tickets/TicketSearch";
import { TicketCard } from "./tickets/TicketCard";
import type { Ticket } from "@/types/ticket";

interface TicketListProps {
  tickets: Ticket[];
  onNewTicket: () => void;
}

export const TicketList = ({ tickets, onNewTicket }: TicketListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCreatedAt, setFilterCreatedAt] = useState<string>("");
  const [filterClosedAt, setFilterClosedAt] = useState<string>("");
  const [filterCompany, setFilterCompany] = useState<string>("");
  const [filterAgent, setFilterAgent] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      tickets = JSON.parse(storedTickets);
    }
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCreatedAt = !filterCreatedAt || ticket.createdAt.includes(filterCreatedAt);
    const matchesClosedAt = !filterClosedAt || (ticket.closedAt && ticket.closedAt.includes(filterClosedAt));
    const matchesCompany = !filterCompany || ticket.company === filterCompany;
    const matchesAgent = !filterAgent || ticket.agent === filterAgent;
    const matchesType = !filterType || ticket.type === filterType;
    const matchesPriority = !filterPriority || ticket.priority === filterPriority;
    const matchesStatus = !filterStatus || ticket.status === filterStatus;
    
    return matchesSearch && matchesCreatedAt && matchesClosedAt && matchesCompany && 
           matchesAgent && matchesType && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full">
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <TicketHeader tickets={tickets} />
          
          <TicketSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNewTicket={onNewTicket}
            tickets={tickets}
            onFilterChange={{
              setFilterCreatedAt,
              setFilterClosedAt,
              setFilterCompany,
              setFilterAgent,
              setFilterType,
              setFilterPriority,
              setFilterStatus,
            }}
          />

          <div className="grid gap-4">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
            {filteredTickets.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tickets found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};