import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeScanerComponent } from './qrcode-scaner.component';

describe('QrcodeScanerComponent', () => {
  let component: QrcodeScanerComponent;
  let fixture: ComponentFixture<QrcodeScanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeScanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeScanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
