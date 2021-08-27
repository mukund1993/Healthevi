import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSelectComponent } from './mselect.component';

describe('MSelectComponent', () => {
  let component: MSelectComponent;
  let fixture: ComponentFixture<MSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
