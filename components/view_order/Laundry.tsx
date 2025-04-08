import { renderEmptyLaundryList } from "app/(app)/(tabs)/create_order";
import { CButton } from "components/common";
import { LaundryItem, LaundryListFooter } from "components/create_order";
import useViewOrder from "hooks/useViewOrder";
import { FlatList } from "react-native";
import { View, Text } from "tamagui";
import { ILaundryItem } from "types/laundry";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useBTStoreHook } from "lib/storage/useBtSettings";
import { useMemo } from "react";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";
import { handlePrintReceipt } from "utils/print";
import { NewOrder } from "types/order";

const Laundry = () => {
  const { currentOrder } = useViewOrder();
  const { connectedDevice } = useBTStoreHook();
  const toast = useToastController();
  const router = useRouter();

  const isPrinterConnected = useMemo(() => {
    return !!connectedDevice?.address;
  }, [connectedDevice]);

  const handlePrint = () => {
    // check if a printer is connected before proceeding
    if (!isPrinterConnected) {
      toast.show("Error", {
        message:
          "No printer connected. Please connect a printer to print the receipt.",
        type: "error",
      });
      // navigate to printer settings screen. add a navigation parameter to ensure app navigates back to this screen after connecting the printer
      router.push({
        pathname: "/(app)/(more)/settings",
        params: { action: "connect-printer" }, // return to create order screen after connecting printer
      });

      return null;
    }

    // Call the onSubmit function to create the order
    handlePrintReceipt(currentOrder! as unknown as NewOrder);
  };

  const balance = useMemo(() => {
    if (!currentOrder) return 0;
    const totalPaymentMade =
      currentOrder.payments?.reduce(
        (acc, item) => acc + (item?.amount ?? 0),
        0
      ) ?? 0;

    return (currentOrder.paymentAmount ?? 0) - totalPaymentMade;
  }, [currentOrder]);

  return (
    <View
      bg={"white"}
      px={"$2"}
      py={"$3"}
      borderColor={"$gray5Light"}
      borderWidth={1}
      borderRadius={"$5"}
    >
      <View
        py={"$2"}
        px={"$3"}
        borderBottomWidth={1}
        borderBottomColor={"$gray6Light"}
      >
        <Text
          lineHeight={22}
          fontWeight={"700"}
          fontSize={15}
          color={"$gray7Dark"}
          mr={"auto"}
        >
          Order Laundry Items
        </Text>
      </View>

      <View p={"$3"}>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={renderEmptyLaundryList}
          data={currentOrder?.laundryItems ?? []}
          renderItem={renderLaundryItem}
          ListFooterComponent={() =>
            renderLaundryFooter(
              currentOrder?.paymentAmount ?? 0,

              balance ?? 0
            )
          }
          scrollEnabled={false}
        />

        <CButton
          mx={"$0"}
          borderRadius={"$5"}
          fontSize={12}
          mt={"$2"}
          onPress={handlePrint}
        >
          <AntDesign name="printer" size={18} color="white" />
          <Text color={"$white1"} fontWeight={"600"} fontSize={13}>
            Reprint Receipt
          </Text>
        </CButton>
      </View>
    </View>
  );
};

export default Laundry;

const renderLaundryItem = ({ item }: { item: ILaundryItem }) => {
  return <LaundryItem item={item} hideActions />;
};
const renderLaundryFooter = (totalOrderAmount: number, balance: number) => (
  <LaundryListFooter
    hideActions
    totalOrderAmount={totalOrderAmount}
    negotiated_amount={0}
    balance={balance}
  />
);
