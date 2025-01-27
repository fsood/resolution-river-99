export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  notes: string;
  domains: string[];
  renewalDate: string;
  industry: string;
  accTier: 'basic' | 'premium' | 'enterprise';
  createdAt: string;
}