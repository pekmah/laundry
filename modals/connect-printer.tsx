import { useToastController } from "lib/toast";
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
import { FlatList, Modal, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IBLEPrinter } from "react-native-thermal-receipt-printer";
import { Text, View, XStack } from "tamagui";
import { getErrorMessage } from "utils";
import { getBTList, PrinterServices } from "utils/bluetooth";
import { requestBtPermissions } from "utils/bluetooth-permissions";

// Define and export the ref type
export interface ConnectPrinterRef {
  openModal: () => void;
  closeModal: () => void;
}

const ConnectPrinter = forwardRef<ConnectPrinterRef>((_, ref) => {
  const [visible, setVisible] = React.useState(false);

  const handleOpenModal = async () => {
    if (!(await requestBtPermissions())) {
      ToastAndroid.show("Bluetooth permission is needed to find printers.", ToastAndroid.LONG);
      return;
    }
    try {
      setBtDeviceList(await getBTList());
      setVisible(true);
    } catch {
      ToastAndroid.show("Could not find Bluetooth printers.", ToastAndroid.LONG);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  // Expose modal methods to the parent component
  useImperativeHandle(ref, () => ({
    openModal: () => { void handleOpenModal(); },
    closeModal: handleCloseModal,
  }));

  const [btDeviceList, setBtDeviceList] = React.useState<IBLEPrinter[]>([]);

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
      paddingVertical="2"
      borderBottomWidth={1}
      marginBottom="2"
      borderColor="gray5Light"
    >
      <Text fontSize={15} fontWeight={"700"} color="gray12Light">
        {"Available Bluetooth Devices"}
      </Text>
    </View>
  );

  return (
    <>
      <CButton
        mt="4"
        letterSpacing={1}
        borderRadius={"2"}
        minWidth={"8"}
        py={"1"}
        px={"2"}
        height={"3"}
        onPress={handleOpenModal}
      >
        <Text fontWeight={"600"} fontSize={12} color={"whitesmoke"}>
          {"Manage"}
        </Text>
      </CButton>

      <Modal visible={visible} animationType="slide" onRequestClose={handleCloseModal}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Container bg={"white"} py={"3"}>
          <FlatList
            data={btDeviceList || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.inner_mac_address}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={<Text>No Bluetooth printers found.</Text>}
          />
          <CButton text="Close" onPress={handleCloseModal} />
        </Container>
        </SafeAreaView>
      </Modal>
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
        gap="1"
        paddingVertical="2"
        borderBottomWidth={1}
        borderColor="gray5Light"
        flex={1}
      >
        <Text fontWeight={"700"} color="gray12Light">
          {name}
        </Text>
        <Text fontWeight={"500"} fontSize={13} color="gray11Light">
          {address}
        </Text>
      </View>

      <CButton
        mt="4"
        letterSpacing={1}
        borderRadius={"2"}
        minWidth={"7"}
        py={"1"}
        px={"2"}
        height={"2"}
        onPress={() => connectMutation.mutate()}
        disabled={connectMutation.isPending}
        backgroundColor={isConnected ? "red11Light" : "primary"}
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
