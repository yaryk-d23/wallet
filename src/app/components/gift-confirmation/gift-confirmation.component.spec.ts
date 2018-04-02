import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftConfirmationComponent } from './gift-confirmation.component';

describe('GiftConfirmationComponent', () => {
  let component: GiftConfirmationComponent;
  let fixture: ComponentFixture<GiftConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
