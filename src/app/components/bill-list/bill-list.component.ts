import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill.model';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatCheckboxModule],
  template: `
    <div class="bill-list-container">
      <h2>Bills</h2>
      <button mat-raised-button color="primary" routerLink="/bills/new">Add New Bill</button>
      <table mat-table [dataSource]="bills" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let bill">{{bill.name}}</td>
        </ng-container>
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let bill">{{bill.amount | currency}}</td>
        </ng-container>
        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef>Due Date</th>
          <td mat-cell *matCellDef="let bill">{{bill.dueDate | date}}</td>
        </ng-container>
        <ng-container matColumnDef="isPaid">
          <th mat-header-cell *matHeaderCellDef>Paid</th>
          <td mat-cell *matCellDef="let bill">
            <mat-checkbox [checked]="bill.isPaid" (change)="togglePaid(bill)" color="primary"></mat-checkbox>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let bill">
            <button mat-icon-button color="primary" [routerLink]="['/bills/edit', bill.id]">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteBill(bill.id)">
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
    .bill-list-container {
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
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  displayedColumns: string[] = ['name', 'amount', 'dueDate', 'isPaid', 'actions'];

  constructor(private billService: BillService) {}

  ngOnInit() {
    this.billService.getBills().subscribe(bills => {
      this.bills = bills;
    });
  }

  togglePaid(bill: Bill) {
    const updatedBill = { ...bill, isPaid: !bill.isPaid };
    this.billService.updateBill(updatedBill);
  }

  deleteBill(id: string) {
    if (confirm('Are you sure you want to delete this bill?')) {
      this.billService.deleteBill(id);
    }
  }
}