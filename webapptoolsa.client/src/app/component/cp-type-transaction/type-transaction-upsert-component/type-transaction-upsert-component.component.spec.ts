import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTransactionUpsertComponentComponent } from './type-transaction-upsert-component.component';

describe('TypeTransactionUpsertComponentComponent', () => {
  let component: TypeTransactionUpsertComponentComponent;
  let fixture: ComponentFixture<TypeTransactionUpsertComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeTransactionUpsertComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeTransactionUpsertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
