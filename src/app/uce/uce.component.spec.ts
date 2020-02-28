import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UceComponent } from './uce.component';

describe('UceComponent', () => {
  let component: UceComponent;
  let fixture: ComponentFixture<UceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
