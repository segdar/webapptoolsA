import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionUpsertComponent } from './transaction-upsert.component';

describe('TransactionUpsertComponent', () => {
  let component: TransactionUpsertComponent;
  let fixture: ComponentFixture<TransactionUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
