import { BLEPrinter, IBLEPrinter } from "react-native-thermal-receipt-printer";

import { BluetoothManager } from "@brooons/react-native-bluetooth-escpos-printer";
import { PermissionsAndroid } from "react-native";

export type BTDevice = {
  name?: string;
  address: string; //mac address
};

export type BTScanResult = {
  title: string;
  data: BTDevice[];
};

export async function getBTList(): Promise<IBLEPrinter[]> {
  return BLEPrinter.init().then(() =>
    BLEPrinter.getDeviceList()
      .then((r: IBLEPrinter[]) => {
        return r;
      })
      .catch((err) => {
        throw err;
      })
  );
}

export async function handleScanBtDevices(): Promise<BTScanResult[]> {
  const granted = await handleBTPermissions();
  if (!granted) {
    throw new Error("Bluetooth permission denied");
  }
  const scannedDevices = JSON.parse(await BluetoothManager.scanDevices());

  const result: BTScanResult[] = [{ title: "", data: [] }];
  if (scannedDevices?.paired) {
    result.push({ title: "Paired Devices", data: scannedDevices.paired });
  }
  if (scannedDevices?.found) {
    result.push({ title: "Unpaired Devices", data: scannedDevices.found });
  }

  return result.filter((item) => !!item.data.length);
}

async function handleBTPermissions() {
  const permissions = {
    title: "App requests permission to access Bluetooth",
    message:
      "App requires access to Bluetooth for connecting to a Bluetooth printer",
    buttonNeutral: "Later",
    buttonNegative: "No",
    buttonPositive: "Allow",
  };

  const bluetoothConnectGranted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    permissions
  );

  if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
    const bluetoothScanGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      permissions
    );
    if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export async function ConnectBtDevice(address: string) {
  return await BluetoothManager.connect(address);
}
export async function DisconnectBtDevice(address: string) {
  return await BluetoothManager.disconnect(address);
}

// connects to the bluetooth printer
async function connectBTPrinter(printerMacAddress: string): Promise<unknown> {
  return BluetoothManager.connect(printerMacAddress).then((p: unknown) => {
    return p;
  });
}

// Disconnect
async function disconnectBTPrinter(
  printerMacAddress: string
): Promise<unknown> {
  return BluetoothManager.disconnect(printerMacAddress).then((p: unknown) => {
    return p;
  });
}

export const PrinterServices = {
  connectBTPrinter,
  disconnectBTPrinter,
};
