import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'qrcode-scaner',
  templateUrl: './qrcode-scaner.component.html',
  styleUrls: ['./qrcode-scaner.component.css']
})
export class QrcodeScanerComponent implements OnInit {
  cameraStarted: boolean;
  qrResult: string;
  selectedDevice: any;
  availableDevices: object = [];
  
  constructor() { }

  ngOnInit() {
  }

  @Input()
    visible: boolean = false;

  @Output()
    scanQRCode = new EventEmitter();
  
  displayCameras(cameras: object[]) {

      this.availableDevices = cameras;

      if (cameras && cameras.length > 0) {
          this.selectedDevice = cameras[0];
          this.cameraStarted = true;
      }
  }

  handleQrCodeResult(result: string) {

      this.qrResult = result;
      this.scanQRCode.emit(this.qrResult);

  }

  onChange(selectedValue: string) {

      this.cameraStarted = false;
      this.selectedDevice = selectedValue;
      this.cameraStarted = true;
  }

}
