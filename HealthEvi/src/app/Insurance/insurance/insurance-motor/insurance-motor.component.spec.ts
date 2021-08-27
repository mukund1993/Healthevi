import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceMotorComponent } from './insurance-motor.component';

describe('InsuranceMotorComponent', () => {
  let component: InsuranceMotorComponent;
  let fixture: ComponentFixture<InsuranceMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
