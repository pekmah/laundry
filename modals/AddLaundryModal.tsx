import { StyleSheet } from "react-native";
import React from "react";
import CustomBottomSheetWrapper from "./CustomBottomSheetWrapper";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { H4, H5, Text, View, XStack, YStack } from "tamagui";
import { CButton, Container } from "components/common";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LaundrySelector } from "components/create_order";

const AddLaundryModal = () => {
  const ref = React.useRef<BottomSheetModal>(null);

  const handleOpenModal = () => {
    ref?.current?.present();
  };

  const handleCloseModal = () => {
    ref?.current?.dismiss();
  };

  return (
    <>
      <CButton
        onPress={handleOpenModal}
        borderRadius={"$4"}
        p={"$1"}
        px={"$2"}
        h={35}
      >
        <Feather name="plus" size={20} color={"white"} />
      </CButton>

      <CustomBottomSheetWrapper
        snapPoints={["20%", "60%"]}
        ref={ref}
        handleComponent={() => renderSheetHeader(handleCloseModal)}
      >
        <Container bg={"white"} py={"$3"}>
          <BottomSheetScrollView style={bottomSheetScrollstyles.bottomSheet}>
            <YStack space={"3"} py={3} px={5} paddingBottom={20}>
              <View>
                <H4
                  lineHeight={20}
                  fontSize={18}
                  color={"$black1"}
                  fontWeight="bold"
                >
                  Add Laundry
                </H4>
                <Text fontSize={12} color={"$black1"} fontWeight="500">
                  Add laundry items to the order
                </Text>
              </View>

              <LaundrySelector />
            </YStack>
          </BottomSheetScrollView>
        </Container>
      </CustomBottomSheetWrapper>
    </>
  );
};

export default AddLaundryModal;

export const renderSheetHeader = (handleClose) => (
  <XStack py={"$2"} justifyContent={"flex-end"} alignItems={"center"}>
    <View
      m={"auto"}
      bg={"$gray11Light"}
      h={"$0.5"}
      w={"$4"}
      borderRadius={"$10"}
    />

    <CButton
      onPress={handleClose}
      borderRadius={"$10"}
      p={"$1"}
      position={"absolute"}
      top={"$2"}
      right={"$2"}
      bg={"$gray6Light"}
      w={"$3"}
      h={"$3"}
    >
      <Ionicons name={"close"} size={20} />
    </CButton>
  </XStack>
);

export const bottomSheetScrollstyles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
  },
});
