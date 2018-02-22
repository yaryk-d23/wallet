import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'qrcode-scaner',
  templateUrl: './qrcode-scaner.component.html',
  styleUrls: ['./qrcode-scaner.component.css']
})
export class QrcodeScanerComponent implements OnInit {
  cameraStarted: boolean = false;
  qrResult: string;
  selectedDevice: any;
  availableDevices: object = [];

  chosenCameraSubject = new Subject();

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

  listCameras($event: MediaDeviceInfo[]) {
    this.chosenCameraSubject.next($event.filter(device => device.kind === 'videoinput')[0])
  }

  onChange(selectedValue: string) {

      this.cameraStarted = false;
      this.selectedDevice = selectedValue;
      this.cameraStarted = true;
  }

}
