export class QRCodeScaner {
    cameraStarted: boolean;
    qrResult: string;
    selectedDevice: any;
    availableDevices: object = [];
    displayCameras(cameras: object[]) {

        console.log('Devices: ', cameras);

        this.availableDevices = cameras;

        if (cameras && cameras.length > 0) {
            this.selectedDevice = cameras[0];
            this.cameraStarted = true;
        }
    }

    handleQrCodeResult(result: string) {

        console.log('Result: ', result);
      
        this.qrResult = result;
    }

    onChange(selectedValue: string) {

        console.log('Selection changed: ', selectedValue);

        this.cameraStarted = false;
        this.selectedDevice = selectedValue;
        this.cameraStarted = true;
    }
}