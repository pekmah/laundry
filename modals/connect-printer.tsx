/* eslint-disable @typescript-eslint/no-explicit-any */
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CButton, Container } from "components/common";
import React, { useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { IBLEPrinter } from "react-native-thermal-receipt-printer";
import { Text, View, XStack } from "tamagui";
import { getBTList, PrinterServices } from "utils/bluetooth";
import { renderSheetHeader } from "./AddLaundryModal";
import CustomBottomSheetWrapper from "./CustomBottomSheetWrapper";
import { useBTStoreHook } from "lib/storage/useBtSettings";
import { useMutation } from "@tanstack/react-query";
import { useToastController } from "@tamagui/toast";
import { getErrorMessage } from "utils";

const ConnectPrinter = () => {
  const ref = React.useRef<BottomSheetModal>(null);

  const handleOpenModal = () => {
    ref?.current?.present();
  };

  const handleCloseModal = () => {
    ref?.current?.dismiss();
  };

  const [btDeviceList, setBtDeviceList] = React.useState<IBLEPrinter[]>([]);

  React.useEffect(() => {
    const fetchBTList = async () => {
      const list = await getBTList();

      setBtDeviceList(list);
    };
    fetchBTList();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: IBLEPrinter }) => (
      <BtItem
        name={item.device_name}
        address={item.inner_mac_address}
        closeModal={handleCloseModal}
      />
    ),
    []
  );

  const renderHeader = () => (
    <View
      paddingVertical={"$2"}
      borderBottomWidth={1}
      marginBottom={"$2"}
      borderColor={"$gray5Light"}
    >
      <Text fontSize={15} fontWeight={"700"} color={"$gray12Light"}>
        {"Available Bluetooth Devices"}
      </Text>
    </View>
  );

  return (
    <>
      <CButton
        mt="$4"
        letterSpacing={1}
        borderRadius={"$2"}
        minWidth={"$8"}
        py={"$1"}
        px={"$2"}
        height={"$3"}
        onPress={handleOpenModal}
      >
        <Text fontWeight={"600"} fontSize={12} color={"whitesmoke"}>
          {"Manage"}
        </Text>
      </CButton>

      <CustomBottomSheetWrapper
        data={btDeviceList}
        renderItem={renderItem}
        snapPoints={["80%", "81%"]}
        ref={ref}
        handleComponent={() => renderSheetHeader(handleCloseModal)}
      >
        <Container bg={"white"} py={"$3"}>
          <FlatList
            data={btDeviceList || []}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
          />
        </Container>
      </CustomBottomSheetWrapper>
    </>
  );
};

export default ConnectPrinter;

interface IBtItem {
  name: string;
  address: string; // mac address
  closeModal?: () => void;
}

export const BtItem = ({ name, address, closeModal }: IBtItem) => {
  const toast = useToastController();

  const { handleDisconnect, handleConnect, connectedDevice } = useBTStoreHook();

  const isConnected = useMemo(
    () => connectedDevice?.address === address,
    [connectedDevice?.address, address]
  );

  const connectMutation = useMutation({
    mutationKey: ["connect-bt", address],
    mutationFn: () =>
      isConnected
        ? PrinterServices.disconnectBTPrinter(address)
        : PrinterServices.connectBTPrinter(address),
    onSuccess: () => {
      if (isConnected) {
        handleDisconnect();
        toast.show("Success.", {
          message: `Disconnected ${name} `,
          type: "info",
        });
      } else {
        handleConnect({ address, name });
        if (closeModal) {
          closeModal();
        }
        toast.show("Success.", {
          message: `Connected to ${name}`,
          type: "success",
        });
      }
    },
    onError: (error: any) => {
      // Handle error and show a toast message
      toast.show("Success.", {
        message: getErrorMessage(
          error,
          `Failed to ${isConnected ? "Disconnected" : "Connected"} to device: `
        ),
        type: "error",
      });
    },
  });

  if (!name) return null;

  return (
    <XStack>
      <View
        gap={"$1"}
        paddingVertical={"$2"}
        borderBottomWidth={1}
        borderColor={"$gray5Light"}
        flex={1}
      >
        <Text fontWeight={"700"} color={"$gray12Light"}>
          {name}
        </Text>
        <Text fontWeight={"500"} fontSize={13} color={"$gray11Light"}>
          {address}
        </Text>
      </View>

      <CButton
        mt="$4"
        letterSpacing={1}
        borderRadius={"$2"}
        minWidth={"$7"}
        py={"$1"}
        px={"$2"}
        height={"$2"}
        onPress={() => connectMutation.mutate()}
        disabled={connectMutation.isPending}
        backgroundColor={isConnected ? "$red11Light" : "$primary"}
      >
        <Text fontWeight={"500"} fontSize={11} color={"whitesmoke"}>
          {connectMutation.isPending
            ? isConnected
              ? "Disconnecting..."
              : "Connecting..."
            : isConnected
            ? "Disconnect"
            : "Connect"}
        </Text>
      </CButton>
    </XStack>
  );
};
