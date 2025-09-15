import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUpsertComponent } from './category-upsert.component';

describe('CategoryUpsertComponent', () => {
  let component: CategoryUpsertComponent;
  let fixture: ComponentFixture<CategoryUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
