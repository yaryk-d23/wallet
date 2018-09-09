import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

@Component({
  selector: 'qrcode-scaner',
  templateUrl: './qrcode-scaner.component.html',
  styleUrls: ['./qrcode-scaner.component.css']
})
export class QrcodeScanerComponent implements AfterViewChecked  {
  @ViewChild('scanner')
    scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  ngAfterViewChecked(): void  {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      this.availableDevices = devices;
      if(devices.length) {
        this.selectedDevice = devices[0];
      }
      // for (const device of devices) {
      //   if (/back|rear|environment/gi.test(device.label)) {
      //       this.scanner.changeDevice(device);
      //       this.selectedDevice = device;
      //       break;
      //   }
      // }

    });

    this.scanner.scanComplete.subscribe((result: Result) => {
        this.qrResult = result;
    });
    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  @Input()
    visible: boolean = false;

  @Output()
    scanQRCode = new EventEmitter();

  onDeviceSelectChange(selectedValue: string) {
      console.debug('Selection changed: ', selectedValue);
      this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }

  handleQrCodeResult(result: string) {
    this.qrResultString = result;
    this.scanQRCode.emit(this.qrResultString);

  }


}
