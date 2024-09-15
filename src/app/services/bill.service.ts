import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private bills: Bill[] = [];
  private billsSubject = new BehaviorSubject<Bill[]>([]);

  constructor() {
    // Initialize with some dummy data
    this.addBill({ name: 'Rent', amount: 1000, dueDate: new Date(2024, 8, 1), isPaid: false });
    this.addBill({ name: 'Electricity', amount: 80, dueDate: new Date(2024, 8, 15), isPaid: true });
  }

  getBills(): Observable<Bill[]> {
    return this.billsSubject.asObservable();
  }

  addBill(bill: Omit<Bill, 'id'>): void {
    const newBill = { ...bill, id: this.generateId() };
    this.bills.push(newBill);
    this.billsSubject.next([...this.bills]);
  }

  updateBill(updatedBill: Bill): void {
    const index = this.bills.findIndex(b => b.id === updatedBill.id);
    if (index !== -1) {
      this.bills[index] = updatedBill;
      this.billsSubject.next([...this.bills]);
    }
  }

  deleteBill(id: string): void {
    this.bills = this.bills.filter(b => b.id !== id);
    this.billsSubject.next([...this.bills]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}