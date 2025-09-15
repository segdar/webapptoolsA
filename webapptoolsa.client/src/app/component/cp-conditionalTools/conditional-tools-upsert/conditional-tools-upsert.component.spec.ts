import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalToolsUpsertComponent } from './conditional-tools-upsert.component';

describe('ConditionalToolsUpsertComponent', () => {
  let component: ConditionalToolsUpsertComponent;
  let fixture: ComponentFixture<ConditionalToolsUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalToolsUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalToolsUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
