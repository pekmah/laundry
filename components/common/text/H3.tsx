import React from "react";
import { Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type Props = {
  text: string;
} & Omit<GetProps<typeof Text>, "text">;
const H3 = ({ text, ...rest }: Props) => {
  return (
    <Text fontWeight={"600"} fontSize="3" {...rest}>
      {text}
    </Text>
  );
};

export default H3;
