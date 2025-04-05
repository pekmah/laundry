import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import bluetoothManager, { BTState } from "lib/bluetooth-state-manager";
import { ConnectPrinterModal } from "modals";
import React, { useEffect, useMemo, useState } from "react";
import { Switch, Text, View, XStack, YStack } from "tamagui";

const BtOption = () => {
  const [bluetoothState, setBluetoothState] =
    useState<keyof typeof BTState>("Unknown");

  const isBtEnabled = useMemo(() => {
    return bluetoothState === BTState.PoweredOn;
  }, [bluetoothState]);

  // bluetooth state listener
  useEffect(() => {
    // Listener for Bluetooth state changes
    const unsubscribe = bluetoothManager.getBluetoothState((newState) => {
      setBluetoothState(newState);
    }, true); // `true` to emit the current state immediately

    // Cleanup the listener on component unmount
    return unsubscribe;
  }, []);

  const handleSwitchBluetooth = () => {
    if (bluetoothState === BTState.PoweredOff) {
      bluetoothManager.enableBluetooth();
    } else {
      bluetoothManager.disableBluetooth();
    }
  };

  return (
    <YStack py={"$1"} gap={"$3"}>
      <XStack alignItems="center" gap={"$3"} py={"$1"}>
        {/* icon bt */}
        <View>
          <Ionicons color={"black"} name="bluetooth-outline" size={20} />
        </View>

        <View flex={1} gap={"$1"}>
          <Text
            fontWeight={"700"}
            fontSize={14}
            col={"$gray12Light"}
            textTransform="capitalize"
          >
            Bluetooth
          </Text>
          {/* description */}
          <Text fontWeight={"500"} fontSize={12} col={"$gray11Light"}>
            Manage your Bluetooth devices
          </Text>
        </View>

        {/* switch */}
        <Switch
          checked={isBtEnabled}
          onCheckedChange={handleSwitchBluetooth}
          theme={"blue_surface4"}
          size="$2"
        >
          <Switch.Thumb
            backgroundColor={"$primary_light"}
            theme={"blue_surface4"}
            animation="quicker"
          />
        </Switch>
      </XStack>

      {isBtEnabled ? (
        <XStack alignItems="center" gap={"$3"} py={"$1"}>
          {/* icon bt */}
          <View>
            <AntDesign name="printer" size={22} color="black" />
          </View>

          <View flex={1} gap={"$1"}>
            <Text
              fontWeight={"700"}
              fontSize={14}
              col={"$gray12Light"}
              textTransform="capitalize"
            >
              Connected Printer
            </Text>

            {/* description */}
            <Text fontWeight={"500"} fontSize={12} col={"$gray11Light"}>
              Manage your Bluetooth devices
            </Text>
          </View>

          {/* Connect button */}
          <ConnectPrinterModal />
        </XStack>
      ) : null}
    </YStack>
  );
};

export default BtOption;
