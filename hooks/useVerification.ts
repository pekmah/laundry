import { OTP_LENGTH } from "constants/variables";
import { useRef, useState } from "react";
import { Keyboard } from "react-native";
import { Input } from "tamagui";

const useVerification = () => {
  const ref = useRef<Input>(null);

  const characters = new Array(OTP_LENGTH).fill(" ");

  const [code, setCode] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleChange = (val) => {
    if (val?.length > OTP_LENGTH) {
      handleBlur();
      return;
    }

    setCode(val);

    if (val.length === OTP_LENGTH) handleBlur();
  };

  const handleFocus = () => {
    ref?.current?.focus();
    setIsFocused(true);
  };

  const hasReachedValidLength = code.length === OTP_LENGTH;

  return {
    code,
    characters,
    isFocused,
    ref,
    hasReachedValidLength,
    setCode,
    handleChange,
    handleFocus,
    handleBlur,
  };
};

export default useVerification;
