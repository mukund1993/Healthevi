import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavnormalComponent } from './navnormal.component';

describe('NavnormalComponent', () => {
  let component: NavnormalComponent;
  let fixture: ComponentFixture<NavnormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavnormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavnormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
