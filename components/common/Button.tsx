import React from "react";
import { Button, Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type CButtonProps = {
  text?: string;
  children?: React.ReactNode;
} & Omit<GetProps<typeof Button>, "text">;

const CButton = ({ text, children, disabled, ...rest }: CButtonProps) => {
  return (
    <Button
      borderRadius="12"
      bg="primary"
      backgroundColor="press:primary"
      opacity={`${disabled ? 0.8 : 1} press:0.8`}
      {...rest}
      disabled={disabled}
    >
      {text ? (
        <Text fontWeight={"600"} fontSize={14} color={"whitesmoke"}>
          {text}
        </Text>
      ) : (
        children
      )}
    </Button>
  );
};

export default CButton;
