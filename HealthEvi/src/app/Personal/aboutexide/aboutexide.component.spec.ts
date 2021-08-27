import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutexideComponent } from './aboutexide.component';

describe('AboutexideComponent', () => {
  let component: AboutexideComponent;
  let fixture: ComponentFixture<AboutexideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutexideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutexideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
