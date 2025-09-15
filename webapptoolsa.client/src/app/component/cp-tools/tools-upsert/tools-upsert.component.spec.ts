import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsUpsertComponent } from './tools-upsert.component';

describe('ToolsUpsertComponent', () => {
  let component: ToolsUpsertComponent;
  let fixture: ComponentFixture<ToolsUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
