import React from "react";
import { Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type Props = {
  text: string;
} & GetProps<typeof Text>;
const H2 = ({ text, ...rest }: Props) => {
  return (
    <Text fontWeight={"600"} fontSize={"$5"} {...rest}>
      {text}
    </Text>
  );
};

export default H2;
