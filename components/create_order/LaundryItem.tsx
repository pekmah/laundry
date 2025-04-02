import { Feather } from "@expo/vector-icons";
import { CButton } from "components/common";
import { useLaundryStore } from "lib/storage/useLaundryStorage";
import { Text, View, XStack } from "tamagui";
import { ILaundryItem, LaundryFormData } from "types/laundry";

const LaundryItem = ({
  item,
  hideActions,
}: {
  item: ILaundryItem | LaundryFormData;
  hideActions?: boolean;
}) => {
  const { removeLaundryItem } = useLaundryStore();

  const handleRemoveItemFromCart = () => {
    if (item.id) removeLaundryItem(String(item.id));
  };
  return (
    <View>
      <XStack justifyContent="space-between">
        <View flex={1}>
          <Text col={"$gray12Light"} fontWeight={"500"} fontSize={13}>
            {item.quantity}
            {"  "} x{"  "}{" "}
            {"laundryCategory" in item
              ? item.laundryCategory.name
              : item.laundry}{" "}
            <Text fontWeight={"300"} fontSize={12} color={"$gray11Light"}>
              (
              {"laundryCategory" in item
                ? item?.laundryCategory.unit
                : item?.unit}
              )
            </Text>
          </Text>
        </View>

        <XStack
          flex={!hideActions ? 0.5 : "unset"}
          justifyContent="space-between"
          alignItems="center"
          gap={"$2"}
        >
          <Text col={"$gray12Light"} fontWeight={"500"} fontSize={13}>
            KES{" "}
            {"laundryCategory" in item
              ? item.laundryCategory.unitPrice * Number(item.quantity)
              : item?.price ?? 0}
          </Text>
          {!hideActions ? (
            <CButton
              p={"1"}
              h={20}
              w={20}
              borderRadius={"$8"}
              bg={"$red3Light"}
              borderColor={"$red8Light"}
              onPress={handleRemoveItemFromCart}
            >
              <Feather name={"x"} size={16} color={"red"} />
            </CButton>
          ) : null}
        </XStack>
      </XStack>
    </View>
  );
};

export default LaundryItem;
