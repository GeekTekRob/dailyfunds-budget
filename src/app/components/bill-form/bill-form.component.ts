import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill.model';

@Component({
  selector: 'app-bill-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatButtonModule],
  template: `
    <div class="bill-form-container">
      <h2>{{ isEditMode ? 'Edit' : 'Add' }} Bill</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="bill.name" name="name" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Amount</mat-label>
          <input matInput type="number" [(ngModel)]="bill.amount" name="amount" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Due Date</mat-label>
          <input matInput [matDatepicker]="picker" [(ngModel)]="bill.dueDate" name="dueDate" required>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-checkbox [(ngModel)]="bill.isPaid" name="isPaid">Paid</mat-checkbox>
        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit">Save</button>
          <button mat-button routerLink="/bills">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .bill-form-container {
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
export class BillFormComponent implements OnInit {
  bill: Bill = { name: '', amount: 0, dueDate: new Date(), isPaid: false };
  isEditMode = false;

  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.billService.getBills().subscribe(bills => {
        const bill = bills.find(b => b.id === id);
        if (bill) {
          this.bill = { ...bill };
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.billService.updateBill(this.bill);
    } else {
      this.billService.addBill(this.bill);
    }
    this.router.navigate(['/bills']);
  }
}