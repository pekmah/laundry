import React from "react";
import { Button, Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type CButtonProps = {
  text?: string;
  children?: React.ReactNode;
} & GetProps<typeof Button>;

const CButton = ({ text, children, ...rest }: CButtonProps) => {
  return (
    <Button
      borderRadius={"$12"}
      bg={"$primary"}
      pressStyle={{ backgroundColor: "$primary", opacity: 0.8 }}
      {...rest}
    >
      {text ? (
        <Text
          letterSpacing={1}
          fontWeight={"600"}
          fontSize={16}
          color={"whitesmoke"}
        >
          {text}
        </Text>
      ) : (
        children
      )}
    </Button>
  );
};

export default CButton;
