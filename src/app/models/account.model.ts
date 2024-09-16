export interface Account {
    id?: string;
    name: string;
    type: 'bank' | 'credit' | 'loan';
    balance: number;
  }