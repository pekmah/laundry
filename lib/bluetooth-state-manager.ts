import { BleManager, Device } from "react-native-ble-plx";

export interface DeviceReference {
  name?: string | null;
  id?: string;
}

/**
 * Device Bluetooth Low Energy state. It's keys are used to check {@link #blemanagerstate} values
 * received by {@link BleManager}
 */
export const BTState = {
  /**
   * The current state of the manager is unknown; an update is imminent.
   */
  Unknown: "Unknown",
  /**
   * The connection with the system service was momentarily lost; an update is imminent.
   */
  Resetting: "Resetting",
  /**
   * The platform does not support Bluetooth low energy.
   */
  Unsupported: "Unsupported",
  /**
   * The app is not authorized to use Bluetooth low energy.
   */
  Unauthorized: "Unauthorized",
  /**
   * Bluetooth is currently powered off.
   */
  PoweredOff: "PoweredOff",
  /**
   * Bluetooth is currently powered on and available to use.
   */
  PoweredOn: "PoweredOn",
};

class BluetoothLeManager {
  bleManager: BleManager;
  device: Device | null;
  isListening = false;

  constructor() {
    this.bleManager = new BleManager();
    this.device = null;
  }

  //   switch bt on
  enableBluetooth = () => {
    this.bleManager.enable();
  };

  // disable
  disableBluetooth = () => {
    this.bleManager.disable();
  };

  scanForPeripherals = async (
    onDeviceFound: (deviceSummary: DeviceReference) => void
  ) => {
    await this.bleManager.startDeviceScan(null, null, (_, scannedDevice) => {
      onDeviceFound({
        id: scannedDevice?.id,
        name: scannedDevice?.localName ?? scannedDevice?.name,
      });
    });
  };

  stopScanningForPeripherals = () => {
    this.bleManager.stopDeviceScan();
  };

  connectToPeripheral = async (identifier: string) => {
    this.device = await this.bleManager.connectToDevice(identifier);
    await this.device?.discoverAllServicesAndCharacteristics();
  };

  getBluetoothState = (
    onStateChange: (newState: keyof typeof BTState) => void,
    emitCurrentState: boolean = false
  ) => {
    this.bleManager.onStateChange((state) => {
      const stateKey = BTState[state] as keyof typeof BTState;
      onStateChange(stateKey);
    }, emitCurrentState);
  };
}

const manager = new BluetoothLeManager();

export default manager;
