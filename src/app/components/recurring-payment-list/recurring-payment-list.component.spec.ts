import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPaymentListComponent } from './recurring-payment-list.component';

describe('RecurringPaymentListComponent', () => {
  let component: RecurringPaymentListComponent;
  let fixture: ComponentFixture<RecurringPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringPaymentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
