import { Stack } from "expo-router";
import { View, Text, YStack } from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useForm } from "react-hook-form";

import { CButton, Container } from "components/common";
import { ControlledInput } from "components/common/input";

const pricing = () => {
  const { control } = useForm();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
        }}
      />

      <Container py={"$3"}>
        <View
          backgroundColor={"$gray8Light"}
          height={150}
          width={"100%"}
          borderRadius={"$6"}
          alignItems="center"
          justifyContent="center"
        >
          <FontAwesome5 name={"images"} size={35} color={"white"} />
          <Text
            fontWeight={"500"}
            fontSize={12}
            position="absolute"
            bottom={10}
            color={"white"}
          >
            Upload your pricing item image
          </Text>
        </View>

        <YStack mt={"$4"}>
          {/* item name */}
          <ControlledInput
            name="name"
            control={control}
            label="Product Name"
            placeholder="name of laundry item i.e. shirt, trousers"
          />

          {/* payment amount */}
          <ControlledInput
            name="price"
            control={control}
            label="Amount"
            placeholder="price of item"
          />
          <CButton
            // onPress={handleSubmit(onSubmit)}
            text={"Save"}
            mt="$4"
            letterSpacing={1}
            // disabled={isPending}
          />
        </YStack>
      </Container>
    </>
  );
};

export default pricing;

const renderHeaderRight = () => {
  return <Text>pricing</Text>;
};
