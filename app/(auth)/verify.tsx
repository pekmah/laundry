import { CButton, Container, H1, Paragraph } from "components/common";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Text, View, XStack } from "tamagui";

import useVerification from "hooks/useVerification";
import {
  CONTAINER_PADDING,
  OTP_LENGTH,
  SCREEN_WIDTH,
} from "constants/variables";

const verify = () => {
  const {
    hasReachedValidLength,
    code,
    isFocused,
    handleBlur,
    ref,
    handleChange,
    handleFocus,
  } = useVerification();

  return (
    <Container backgroundColor={"$white1"} flex={1} py={"$0"}>
      {/* signin title */}
      <H1 textAlign="center" text="Verify account" />
      <Paragraph color={"black"} textAlign="center">
        Enter the code sent to your email:{" "}
        <Text fontWeight={"500"}>email@mail.com</Text>
      </Paragraph>

      <XStack py={"$4"} gap={"$3"}>
        {new Array(OTP_LENGTH).fill("_").map((_, ind) => {
          if (ind > OTP_LENGTH) return null;

          const inputCharacter = code[ind];
          const isCurrent = ind === code.length && isFocused;

          return (
            <TouchableOpacity key={ind} onPress={handleFocus}>
              {/* email or phone */}
              <View
                h={50}
                w={Math.floor(
                  (SCREEN_WIDTH - CONTAINER_PADDING * 2) / (OTP_LENGTH + 1)
                )}
                //   w={50}
                bg={isCurrent ? "$blue2Light" : "$gray3Light"}
                justifyContent="center"
                alignItems="center"
                borderRadius={"$3"}
                borderWidth={isCurrent ? 2 : 1}
                borderColor={isCurrent ? "$primary" : "$gray6Light"}
              >
                <Text fontWeight={"500"} color={"black"}>
                  {inputCharacter}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </XStack>

      <CButton
        disabled={!hasReachedValidLength}
        text="Verify"
        mt="$4"
        letterSpacing={1}
      />

      <Paragraph
        mt={"$5"}
        fontWeight={"500"}
        fontSize={14}
        textAlign="center"
        col={"black"}
      >
        Did not receive code?
        <Link href={"/signup"}>
          <Text
            textDecorationLine={"underline"}
            color={"$primary"}
            fontWeight={"600"}
          >
            {" "}
            Resend
          </Text>
        </Link>
      </Paragraph>

      <Input
        // display="none"
        height={1}
        w={1}
        position="absolute"
        bottom={"$-1"}
        ref={ref}
        maxLength={OTP_LENGTH}
        onChangeText={handleChange}
        onBlur={handleBlur}
        keyboardType="number-pad"
      />
    </Container>
  );
};

export default verify;
