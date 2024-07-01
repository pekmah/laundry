import { CButton, CInput, Container, H1, Paragraph } from "components/common";
import { Link, useRouter } from "expo-router";
import { Text, YStack } from "tamagui";

const signup = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/verify");
  };

  return (
    <Container backgroundColor={"$white1"} flex={1} py={"$0"}>
      {/* signin title */}
      <H1 textAlign="center" text="Create Account" />
      <Paragraph
        color={"black"}
        textAlign="center"
        text="Await account approval once you create account"
      />

      <YStack mt={"$5"} gap={"$2"}>
        {/* Name */}
        <CInput
          label="Full Name"
          placeholder="Enter your name"
          keyboardType="number-pad"
        />

        {/* Email */}
        <CInput label="Email" placeholder="email@mail.com" />

        {/*  phone */}
        <CInput
          label="Phone number"
          placeholder="07XX XXX XXX"
          keyboardType="number-pad"
        />

        {/* password */}
        <CInput label="Password" placeholder="password" secureTextEntry />

        {/* confirm password */}
        <CInput
          label="Confirm Password"
          placeholder="password"
          secureTextEntry
        />

        <CButton
          onPress={handleRegister}
          text="Create"
          mt="$4"
          letterSpacing={1}
        />

        <Paragraph
          mt={"$2"}
          fontWeight={"500"}
          fontSize={14}
          textAlign="center"
          col={"black"}
        >
          Have an account?
          <Link href={"/signin"}>
            <Text
              textDecorationLine={"underline"}
              color={"$primary"}
              fontWeight={"600"}
            >
              {" "}
              Sign in
            </Text>
          </Link>
        </Paragraph>
      </YStack>
    </Container>
  );
};

export default signup;
