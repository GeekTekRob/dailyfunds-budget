import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecurringPayment } from '../models/recurring-payment.model';

@Injectable({
  providedIn: 'root'
})
export class RecurringPaymentService {
  private recurringPayments: RecurringPayment[] = [];
  private recurringPaymentsSubject = new BehaviorSubject<RecurringPayment[]>([]);

  constructor() {
    // Initialize with some dummy data
    this.addRecurringPayment({ name: 'Netflix', amount: 15.99, frequency: 'monthly', nextDueDate: new Date(2024, 8, 5) });
    this.addRecurringPayment({ name: 'Gym Membership', amount: 50, frequency: 'monthly', nextDueDate: new Date(2024, 8, 10) });
  }

  getRecurringPayments(): Observable<RecurringPayment[]> {
    return this.recurringPaymentsSubject.asObservable();
  }

  addRecurringPayment(payment: Omit<RecurringPayment, 'id'>): void {
    const newPayment = { ...payment, id: this.generateId() };
    this.recurringPayments.push(newPayment);
    this.recurringPaymentsSubject.next([...this.recurringPayments]);
  }

  updateRecurringPayment(updatedPayment: RecurringPayment): void {
    const index = this.recurringPayments.findIndex(p => p.id === updatedPayment.id);
    if (index !== -1) {
      this.recurringPayments[index] = updatedPayment;
      this.recurringPaymentsSubject.next([...this.recurringPayments]);
    }
  }

  deleteRecurringPayment(id: string): void {
    this.recurringPayments = this.recurringPayments.filter(p => p.id !== id);
    this.recurringPaymentsSubject.next([...this.recurringPayments]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}