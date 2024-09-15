import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>DailyFunds Budget</span>
      <a mat-button routerLink="/dashboard">Dashboard</a>
      <a mat-button routerLink="/accounts">Accounts</a>
      <a mat-button routerLink="/bills">Bills</a>
      <a mat-button routerLink="/recurring-payments">Recurring Payments</a>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dailyfunds-budget';
}
