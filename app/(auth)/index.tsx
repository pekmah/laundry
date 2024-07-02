import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, YStack } from "tamagui";
import { useMutation } from "@tanstack/react-query";
import { useToastController } from "@tamagui/toast";
import { Keyboard } from "react-native";

import { SigninFormData, SigninSchema } from "lib/types/auth";
import AuthServices from "lib/services/AuthServices";
import { CButton, Container, H1, Paragraph } from "components/common";
import { ControlledInput } from "components/common/input";
import { useAuthStore } from "lib/storage/useAuthStore";

const signin = () => {
  const toast = useToastController();
  const { saveUser } = useAuthStore();
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<SigninFormData>({
    resolver: zodResolver(SigninSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: AuthServices.signIn,
    onSuccess: (data) => {
      // save user to global store
      saveUser(data.user, data.jwt);
      // reset form to empty
      reset();
      router.replace("/");
    },
    onError: (error) => {
      toast.show("Error signing in", {
        message: error.message,
        type: "error",
      });
    },
  });

  const onSubmit = (data: SigninFormData) => {
    Keyboard.dismiss();
    mutate(data);
  };

  return (
    <Container backgroundColor={"$white1"} flex={1} pt={"$5"}>
      <SafeAreaView>
        {/* signin title */}
        <H1 textAlign="center" text="Sign in" />

        <YStack mt={"$5"} gap={"$3"}>
          {/* email or phone */}
          <ControlledInput
            name="identifier"
            control={control}
            label="Email or Phone"
            placeholder="email or phone"
          />

          {/* password */}
          <ControlledInput
            name="password"
            control={control}
            label="Password"
            placeholder="password"
            secureTextEntry
          />

          <CButton
            onPress={handleSubmit(onSubmit)}
            text={isPending ? "signing in..." : "Login"}
            mt="$4"
            letterSpacing={1}
            disabled={isPending}
          />

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
