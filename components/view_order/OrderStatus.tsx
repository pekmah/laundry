import { ORDER_STAGES } from "constants/order";
import useViewOrder from "hooks/useViewOrder";
import { Text, View, XStack, YStack } from "tamagui";
import LogItem from "./LogItem";
import { EmptyLaundryList } from "components/create_order";

const OrderStatus = () => {
  const { logs } = useViewOrder();
  return (
    <View
      bg={"white"}
      px={"$2"}
      py={"$3"}
      borderColor={"$gray5Light"}
      borderWidth={1}
      borderRadius={"$5"}
      mb={"$3"}
    >
      <View
        py={"$2"}
        px={"$3"}
        borderBottomWidth={1}
        borderBottomColor={"$gray6Light"}
      >
        <Text
          letterSpacing={0.5}
          fontWeight={"700"}
          fontSize={15}
          color={"$gray7Dark"}
          mr={"auto"}
        >
          Order Status
        </Text>
      </View>

      {!logs?.length ? (
        <View py={"$4"}>
          <EmptyLaundryList />
        </View>
      ) : (
        <View mt={"$2"}>
          <XStack>
            {logs?.length ? (
              <View flexDirection="row" justifyContent="center" w={"$3"}>
                <View backgroundColor={"$primary"} w={2} my={"$3"} />
              </View>
            ) : null}
            <YStack gap={"$3"}>
              {logs?.map((log) => (
                <LogItem
                  key={log.id}
                  title={log.description}
                  time={log.createdAt}
                  isLast={log.stage === ORDER_STAGES[4]}
                />
              ))}
            </YStack>
          </XStack>
        </View>
      )}
    </View>
  );
};

export default OrderStatus;
