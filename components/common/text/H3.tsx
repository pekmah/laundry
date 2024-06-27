import React from "react";
import { Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type Props = {
  text: string;
} & GetProps<typeof Text>;
const H3 = ({ text, ...rest }: Props) => {
  return (
    <Text fontWeight={"600"} fontSize={"$3"} {...rest}>
      {text}
    </Text>
  );
};

export default H3;
