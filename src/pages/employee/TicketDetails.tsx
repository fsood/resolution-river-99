import { useParams } from "react-router-dom";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";

const TicketDetails = () => {
  const { id } = useParams();

  return (
    <div className="flex h-screen">
      <EmployeeSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Ticket #{id}</h1>
        {/* Ticket details content will go here */}
      </main>
    </div>
  );
};

export default TicketDetails;