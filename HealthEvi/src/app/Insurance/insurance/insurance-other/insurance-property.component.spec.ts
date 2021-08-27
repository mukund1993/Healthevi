import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePropertyComponent } from './insurance-property.component';

describe('InsurancePropertyComponent', () => {
  let component: InsurancePropertyComponent;
  let fixture: ComponentFixture<InsurancePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
