export interface RecurringPayment {
    id?: string;
    name: string;
    amount: number;
    frequency: 'weekly' | 'monthly' | 'yearly';
    nextDueDate: Date;
  }