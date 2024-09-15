import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { BillListComponent } from './components/bill-list/bill-list.component';
import { BillFormComponent } from './components/bill-form/bill-form.component';
import { RecurringPaymentListComponent } from './components/recurring-payment-list/recurring-payment-list.component';
import { RecurringPaymentFormComponent } from './components/recurring-payment-form/recurring-payment-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'accounts/new', component: AccountFormComponent },
  { path: 'accounts/edit/:id', component: AccountFormComponent },
  { path: 'bills', component: BillListComponent },
  { path: 'bills/new', component: BillFormComponent },
  { path: 'bills/edit/:id', component: BillFormComponent },
  { path: 'recurring-payments', component: RecurringPaymentListComponent },
  { path: 'recurring-payments/new', component: RecurringPaymentFormComponent },
  { path: 'recurring-payments/edit/:id', component: RecurringPaymentFormComponent },
];