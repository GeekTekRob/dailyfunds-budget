import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [];
  private accountsSubject = new BehaviorSubject<Account[]>([]);

  constructor() {
    // Initialize with some dummy data
    this.addAccount({ name: 'Checking', type: 'bank', balance: 1000 });
    this.addAccount({ name: 'Savings', type: 'bank', balance: 5000 });
    this.addAccount({ name: 'Credit Card', type: 'credit', balance: -500 });
  }

  getAccounts(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }

  addAccount(account: Omit<Account, 'id'>): void {
    const newAccount = { ...account, id: this.generateId() };
    this.accounts.push(newAccount);
    this.accountsSubject.next([...this.accounts]);
  }

  updateAccount(updatedAccount: Account): void {
    const index = this.accounts.findIndex(a => a.id === updatedAccount.id);
    if (index !== -1) {
      this.accounts[index] = updatedAccount;
      this.accountsSubject.next([...this.accounts]);
    }
  }

  deleteAccount(id: string): void {
    this.accounts = this.accounts.filter(a => a.id !== id);
    this.accountsSubject.next([...this.accounts]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}