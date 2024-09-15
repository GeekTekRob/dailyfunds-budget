import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RecurringPaymentService } from '../../services/recurring-payment.service';
import { RecurringPayment } from '../../models/recurring-payment.model';

@Component({
  selector: 'app-recurring-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  template: `
    <div class="recurring-payment-form-container">
      <h2>{{ isEditMode ? 'Edit' : 'Add' }} Recurring Payment</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="payment.name" name="name" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Amount</mat-label>
          <input matInput type="number" [(ngModel)]="payment.amount" name="amount" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Frequency</mat-label>
          <mat-select [(ngModel)]="payment.frequency" name="frequency" required>
            <mat-option value="weekly">Weekly</mat-option>
            <mat-option value="monthly">Monthly</mat-option>
            <mat-option value="yearly">Yearly</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Next Due Date</mat-label>
          <input matInput [matDatepicker]="picker" [(ngModel)]="payment.nextDueDate" name="nextDueDate" required>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit">Save</button>
          <button mat-button routerLink="/recurring-payments">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .recurring-payment-form-container {
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
export class RecurringPaymentFormComponent implements OnInit {
  payment: RecurringPayment = { name: '', amount: 0, frequency: 'monthly', nextDueDate: new Date() };
  isEditMode = false;

  constructor(
    private recurringPaymentService: RecurringPaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.recurringPaymentService.getRecurringPayments().subscribe(payments => {
        const payment = payments.find(p => p.id === id);
        if (payment) {
          this.payment = { ...payment };
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.recurringPaymentService.updateRecurringPayment(this.payment);
    } else {
      this.recurringPaymentService.addRecurringPayment(this.payment);
    }
    this.router.navigate(['/recurring-payments']);
  }
}