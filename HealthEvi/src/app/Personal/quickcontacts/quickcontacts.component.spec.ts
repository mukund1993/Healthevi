import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickcontactsComponent } from './quickcontacts.component';

describe('QuickcontactsComponent', () => {
  let component: QuickcontactsComponent;
  let fixture: ComponentFixture<QuickcontactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickcontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
