import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecurringPaymentService } from '../../services/recurring-payment.service';
import { RecurringPayment } from '../../models/recurring-payment.model';

@Component({
  selector: 'app-recurring-payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="recurring-payment-list-container">
      <h2>Recurring Payments</h2>
      <button mat-raised-button color="primary" routerLink="/recurring-payments/new">Add New Recurring Payment</button>
      <table mat-table [dataSource]="recurringPayments" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let payment">{{payment.name}}</td>
        </ng-container>
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let payment">{{payment.amount | currency}}</td>
        </ng-container>
        <ng-container matColumnDef="frequency">
          <th mat-header-cell *matHeaderCellDef>Frequency</th>
          <td mat-cell *matCellDef="let payment">{{payment.frequency}}</td>
        </ng-container>
        <ng-container matColumnDef="nextDueDate">
          <th mat-header-cell *matHeaderCellDef>Next Due Date</th>
          <td mat-cell *matCellDef="let payment">{{payment.nextDueDate | date}}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let payment">
            <button mat-icon-button color="primary" [routerLink]="['/recurring-payments/edit', payment.id]">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteRecurringPayment(payment.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .recurring-payment-list-container {
      padding: 20px;
    }
    table {
      width: 100%;
      margin-top: 20px;
    }
    h2 {
      margin-bottom: 20px;
    }
  `]
})
export class RecurringPaymentListComponent implements OnInit {
  recurringPayments: RecurringPayment[] = [];
  displayedColumns: string[] = ['name', 'amount', 'frequency', 'nextDueDate', 'actions'];

  constructor(private recurringPaymentService: RecurringPaymentService) {}

  ngOnInit() {
    this.recurringPaymentService.getRecurringPayments().subscribe(payments => {
      this.recurringPayments = payments;
    });
  }

  deleteRecurringPayment(id: string) {
    if (confirm('Are you sure you want to delete this recurring payment?')) {
      this.recurringPaymentService.deleteRecurringPayment(id);
    }
  }
}