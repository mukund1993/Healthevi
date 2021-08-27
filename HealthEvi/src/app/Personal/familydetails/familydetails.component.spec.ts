import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilydetailsComponent } from './familydetails.component';

describe('FamilydetailsComponent', () => {
  let component: FamilydetailsComponent;
  let fixture: ComponentFixture<FamilydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
