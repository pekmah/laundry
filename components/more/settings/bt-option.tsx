import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import bluetoothManager, { BTState } from "lib/bluetooth-state-manager";
import { Switch, Text, View, XStack, YStack } from "tamagui";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ConnectPrinterModal, { ConnectPrinterRef } from "modals/connect-printer";

const BtOption = () => {
  const [bluetoothState, setBluetoothState] =
    useState<keyof typeof BTState>("Unknown");
  const params = useLocalSearchParams();
  const ref = useRef<ConnectPrinterRef>(null);

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

  // Check route params for "connect-printer" action
  useEffect(() => {
    if (params?.action === "connect-printer" && isBtEnabled) {
      // Open the Connect Printer modal if Bluetooth is enabled
      ref.current?.openModal();
    }
  }, [params?.action, isBtEnabled, bluetoothManager]);

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
          <ConnectPrinterModal ref={ref} />
        </XStack>
      ) : null}
    </YStack>
  );
};

export default BtOption;
