import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionaltoolsComponent } from './conditionaltools.component';

describe('ConditionaltoolsComponent', () => {
  let component: ConditionaltoolsComponent;
  let fixture: ComponentFixture<ConditionaltoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionaltoolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionaltoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
