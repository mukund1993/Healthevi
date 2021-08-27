import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceHealthComponent } from './insurance-health.component';

describe('InsuranceHealthComponent', () => {
  let component: InsuranceHealthComponent;
  let fixture: ComponentFixture<InsuranceHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
