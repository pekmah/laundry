import { useQuery } from "@tanstack/react-query";
import { PAYMENT_QUERY_KEY } from "app/(app)/(more)/payment-modes";
import { CButton } from "components/common";
import useViewOrder from "hooks/useViewOrder";
import { selectAllPaymentModes } from "lib/sqlite/paymentModes";
import moment from "moment";
import { View, Text, YStack, XStack } from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export interface IPaymentType {
  id: number;
  name: string;
}

const Payment = () => {
  const { currentOrder, totalPaymentMade, handlePay } = useViewOrder();

  const { data } = useQuery<IPaymentType[]>({
    queryKey: PAYMENT_QUERY_KEY,
    queryFn: selectAllPaymentModes,
  });

  const getPaymentType = (id) => {
    const paymentType = data?.find((item) => item.id === id);
    return paymentType?.name;
  };

  const balance = (currentOrder?.paymentAmount ?? 0) - totalPaymentMade;

  return (
    <>
      {/* header */}
      <View
        bg={"white"}
        px={"$2"}
        py={"$3"}
        borderColor={"$gray5Light"}
        borderWidth={1}
        borderRadius={"$5"}
        mt={"$3"}
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
            Order Payment
          </Text>
        </View>

        {currentOrder?.payments?.length ? (
          <YStack
            gap={"$2"}
            py={"$3"}
            mx={"$3"}
            borderBottomWidth={1}
            borderBottomColor={"$gray7Light"}
          >
            <PaymentItem title={"Payments"} value="" />
            {/* payments */}
            {currentOrder?.payments?.map((payment) => (
              <PaymentItem
                key={payment.id}
                title={payment.amount.toString()}
                value={moment(payment.createdAt).format("DD MMM YYYY hh:mm A")}
                desc={payment.otherDetails || ""}
              />
            ))}
          </YStack>
        ) : null}

        {/* body */}
        <YStack p={"$3"} gap={"$2"}>
          <PaymentItem
            title={"Total Laundry Amount"}
            value={currentOrder?.totalAmount?.toString() ?? "0"}
            app="KES"
          />
          <PaymentItem
            title={"Amount to Pay"}
            value={currentOrder?.paymentAmount?.toString() ?? "0"}
            app="KES"
          />
          <PaymentItem
            title={"Paid Amount"}
            value={totalPaymentMade.toString()}
            app="KES"
          />

          <View
            h={1}
            w={"full"}
            borderTopWidth={1}
            mb={"$1"}
            borderColor={"$gray7Light"}
          />

          <PaymentItem
            title={"Balance"}
            value={balance?.toString()}
            app="KES"
          />
        </YStack>

        {balance ? (
          <CButton
            mx={"$2"}
            borderRadius={"$5"}
            fontSize={12}
            onPress={handlePay}
          >
            <FontAwesome5 name="cc-amazon-pay" size={16} color="white" />
            <Text fontSize={13} color={"$white1"} fontWeight={"600"}>
              Pay Balance
            </Text>
          </CButton>
        ) : null}
      </View>
    </>
  );
};

export default Payment;

const PaymentItem = ({
  title,
  desc,
  value,
  app,
}: {
  title: string;
  desc?: string;
  value: string;
  app?: string;
}) => {
  return (
    <XStack justifyContent="space-between">
      <View flex={1}>
        <Text color={"$black1"} fontWeight={"600"}>
          {title}
        </Text>
        {desc ? (
          <Text fontSize={11} color={"$black1"} fontWeight={"400"}>
            {desc}
          </Text>
        ) : null}
      </View>
      <Text color={"$black1"} fontWeight={"500"}>
        {app} {value ?? "0"}
      </Text>
    </XStack>
  );
};
