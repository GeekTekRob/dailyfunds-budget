import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <div class="account-form-container">
      <h2>{{ isEditMode ? 'Edit' : 'Add' }} Account</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="account.name" name="name" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Type</mat-label>
          <mat-select [(ngModel)]="account.type" name="type" required>
            <mat-option value="bank">Bank</mat-option>
            <mat-option value="credit">Credit</mat-option>
            <mat-option value="loan">Loan</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Balance</mat-label>
          <input matInput type="number" [(ngModel)]="account.balance" name="balance" required>
        </mat-form-field>
        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit">Save</button>
          <button mat-button routerLink="/accounts">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .account-form-container {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    .form-actions {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class AccountFormComponent implements OnInit {
  account: Account = { name: '', type: 'bank', balance: 0 };
  isEditMode = false;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.accountService.getAccounts().subscribe(accounts => {
        const account = accounts.find(a => a.id === id);
        if (account) {
          this.account = { ...account };
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.accountService.updateAccount(this.account);
    } else {
      this.accountService.addAccount(this.account);
    }
    this.router.navigate(['/accounts']);
  }
}