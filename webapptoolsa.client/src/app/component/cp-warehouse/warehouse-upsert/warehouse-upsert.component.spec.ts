import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseUpsertComponent } from './warehouse-upsert.component';

describe('WarehouseUpsertComponent', () => {
  let component: WarehouseUpsertComponent;
  let fixture: ComponentFixture<WarehouseUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
