import { CButton, CInput, Container, H1, Paragraph } from "components/common";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Anchor, Text, YStack } from "tamagui";

const signin = () => {
  return (
    <Container backgroundColor={"$white1"} flex={1} pt={"$5"}>
      <SafeAreaView>
        {/* signin title */}
        <H1 textAlign="center" text="Sign in" />

        <YStack mt={"$5"} gap={"$3"}>
          {/* email or phone */}
          <CInput
            label="Email or Phone"
            placeholder="07XX XXX XXX"
            keyboardType="number-pad"
          />

          {/* password */}
          <CInput label="Password" placeholder="password" secureTextEntry />

          <CButton text="Login" mt="$4" letterSpacing={1} />

          <Paragraph
            mt={"$2"}
            color={"black"}
            fontSize={14}
            textAlign="center"
            col={"$primary"}
            text="Forgot password?"
          />

          <Paragraph
            mt={"$2"}
            fontWeight={"500"}
            fontSize={14}
            textAlign="center"
            col={"black"}
          >
            Don't have an account?
            <Link href={"/signup"}>
              <Text
                textDecorationLine={"underline"}
                color={"$primary"}
                fontWeight={"600"}
              >
                {" "}
                Sign up
              </Text>
            </Link>
          </Paragraph>
        </YStack>
      </SafeAreaView>
    </Container>
  );
};

export default signin;
