export interface Transaction {
    id?: string;
    accountId: string;
    amount: number;
    date: Date;
    category: string;
    description: string;
  }