export interface Ticket {
  id: string;
  subject: string;
  company: string;
  contact: string;
  type: 'problem' | 'question' | 'incident';
  source: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  agent?: string;
  description: string;
  createdAt: string;
  closedAt?: string;
}