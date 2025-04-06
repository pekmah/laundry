import React from "react";
import { Button, Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type CButtonProps = {
  text?: string;
  children?: React.ReactNode;
} & GetProps<typeof Button>;

const CButton = ({ text, children, disabled, ...rest }: CButtonProps) => {
  return (
    <Button
      borderRadius={"$12"}
      bg={"$primary"}
      pressStyle={{ backgroundColor: "$primary", opacity: 0.8 }}
      disabled={disabled}
      opacity={disabled ? 0.8 : 1}
      {...rest}
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
