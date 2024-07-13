import { CButton } from "components/common";
import useViewOrder from "hooks/useViewOrder";
import moment from "moment";
import { View, Text, YStack, XStack } from "tamagui";

const Payment = () => {
  const { currentOrder, totalPaymentMade, handlePay } = useViewOrder();

  const balance = (currentOrder?.negotiated_amount ?? 0) - totalPaymentMade;

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

        {currentOrder?.payments?.data?.length && (
          <YStack
            gap={"$2"}
            py={"$3"}
            mx={"$3"}
            borderBottomWidth={1}
            borderBottomColor={"$gray7Light"}
          >
            <PaymentItem title={"Payments"} value="" />
            {/* payments */}
            {currentOrder?.payments?.data?.map((payment) => (
              <PaymentItem
                key={payment.id}
                title={payment.amount.toString()}
                value={moment(payment.createdAt).format("DD MMM YYYY hh:mm A")}
              />
            ))}
          </YStack>
        )}

        {/* body */}
        <YStack p={"$3"} gap={"$2"}>
          <PaymentItem
            title={"Total Laundry Amount"}
            value={currentOrder?.amount?.toString() ?? "0"}
            app="KES"
          />
          <PaymentItem
            title={"Amount to Pay"}
            value={currentOrder?.negotiated_amount?.toString() ?? "0"}
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

        <CButton
          mx={"$2"}
          borderRadius={"$5"}
          fontSize={12}
          onPress={handlePay}
        >
          <Text color={"$white1"} fontWeight={"600"}>
            Pay Balance
          </Text>
        </CButton>
      </View>
    </>
  );
};

export default Payment;

const PaymentItem = ({
  title,
  value,
  app,
}: {
  title: string;
  value: string;
  app?: string;
}) => {
  return (
    <XStack justifyContent="space-between">
      <Text color={"$black1"} fontWeight={"600"}>
        {title}
      </Text>

      <Text color={"$black1"} fontWeight={"500"}>
        {app} {value ?? "0"}
      </Text>
    </XStack>
  );
};
