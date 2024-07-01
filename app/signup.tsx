import { zodResolver } from "@hookform/resolvers/zod";
import { useToastController } from "@tamagui/toast";
import { useMutation } from "@tanstack/react-query";
import { CButton, CInput, Container, H1, Paragraph } from "components/common";
import { ControlledInput } from "components/common/input";
import { Link, useRouter } from "expo-router";
import AuthServices from "lib/services/AuthServices";
import { RegistrationFormData, RegistrationSchema } from "lib/types/auth";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { ScrollView, Text, YStack } from "tamagui";

const signup = () => {
  const router = useRouter();
  const toast = useToastController();
  const { handleSubmit, control, reset } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: AuthServices.register,
    onSuccess: () => {
      reset();
      router.push("/signin");
      toast.show("Success.", {
        message: "Account created successfully, awaiting approval",
        type: "success",
      });
    },
    onError: (error) => {
      toast.show("Error signing up", {
        message: error.message,
        type: "error",
      });
    },
  });

  const handleRegister = (data: RegistrationFormData) => {
    Keyboard.dismiss();
    mutate({ ...data, active: false, username: data.phone });
  };

  return (
    <Container backgroundColor={"$white1"} flex={1} py={"$0"}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="interactive"
      >
        {/* signin title */}
        <H1 textAlign="center" text="Create Account" />
        <Paragraph
          color={"black"}
          textAlign="center"
          text="Await account approval once you create account"
        />

        <YStack mt={"$5"} gap={"$2"}>
          {/* Name */}
          <ControlledInput
            name="name"
            control={control}
            label="Full Name"
            placeholder="Enter your name"
          />

          {/* Email */}
          <ControlledInput
            name="email"
            control={control}
            label="Email"
            placeholder="email@mail.com"
          />

          {/*  phone */}
          <ControlledInput
            name="phone"
            control={control}
            label="Phone number"
            placeholder="07XX XXX XXX"
            keyboardType="number-pad"
          />

          {/* password */}
          <ControlledInput
            name="password"
            control={control}
            label="Password"
            placeholder="password"
            secureTextEntry
          />

          {/* confirm password */}
          <ControlledInput
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            placeholder="password"
            secureTextEntry
          />

          <CButton
            onPress={handleSubmit(handleRegister)}
            text={isPending ? "Creating..." : "Create"}
            mt="$4"
            letterSpacing={1}
            disabled={isPending}
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
      </ScrollView>
    </Container>
  );
};

export default signup;
