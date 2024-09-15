import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPaymentFormComponent } from './recurring-payment-form.component';

describe('RecurringPaymentFormComponent', () => {
  let component: RecurringPaymentFormComponent;
  let fixture: ComponentFixture<RecurringPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringPaymentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
