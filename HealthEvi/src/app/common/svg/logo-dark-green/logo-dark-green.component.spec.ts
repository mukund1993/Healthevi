import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoDarkGreenComponent } from './logo-dark-green.component';

describe('LogoDarkGreenComponent', () => {
  let component: LogoDarkGreenComponent;
  let fixture: ComponentFixture<LogoDarkGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoDarkGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoDarkGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
