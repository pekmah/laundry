import React from "react";
import { Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type Props = {
  text?: string;
  children?: React.ReactNode;
} & GetProps<typeof Text>;
const CText = ({ text, children, ...rest }: Props) => {
  return (
    <Text fontWeight={"400"} fontSize={"$3"} {...rest}>
      {text ? text : children}
    </Text>
  );
};

export default CText;
