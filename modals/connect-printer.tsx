import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useToastController } from "@tamagui/toast";
import { useMutation } from "@tanstack/react-query";
import { CButton, Container } from "components/common";
import { useRouter } from "expo-router";
import { useBTStoreHook } from "lib/storage/useBtSettings";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import { FlatList, ToastAndroid } from "react-native";
import { IBLEPrinter } from "react-native-thermal-receipt-printer";
import { Text, View, XStack } from "tamagui";
import { getErrorMessage } from "utils";
import { getBTList, PrinterServices } from "utils/bluetooth";
import { renderSheetHeader } from "./AddLaundryModal";
import CustomBottomSheetWrapper from "./CustomBottomSheetWrapper";

// Define and export the ref type
export interface ConnectPrinterRef {
  openModal: () => void;
  closeModal: () => void;
}

const ConnectPrinter = forwardRef<ConnectPrinterRef>((_, ref) => {
  const modalRef = React.useRef<BottomSheetModal>(null);

  const handleOpenModal = () => {
    modalRef?.current?.present();
  };

  const handleCloseModal = () => {
    modalRef?.current?.dismiss();
  };

  // Expose modal methods to the parent component
  useImperativeHandle(ref, () => ({
    openModal: () => modalRef.current?.present(),
    closeModal: () => modalRef.current?.dismiss(),
  }));

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
        ref={modalRef}
        handleComponent={() =>
          renderSheetHeader(() => modalRef.current?.dismiss())
        }
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
});

ConnectPrinter.displayName = "ConnectPrinterModal";

export default ConnectPrinter;

interface IBtItem {
  name: string;
  address: string; // mac address
  closeModal?: () => void;
}

export const BtItem = ({ name, address, closeModal }: IBtItem) => {
  const toast = useToastController();
  const router = useRouter();

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
        ToastAndroid.show(`Disconnected from ${name}`, ToastAndroid.LONG);
      } else {
        handleConnect({ address, name });
        ToastAndroid.show(`Connected to ${name}`, ToastAndroid.LONG);
        if (closeModal) {
          closeModal();
        }
        router.back();
      }
    },
    onError: (error: unknown) => {
      toast.show("Error.", {
        message: getErrorMessage(
          error,
          `Failed to ${isConnected ? "disconnect" : "connect"} to device: `
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
