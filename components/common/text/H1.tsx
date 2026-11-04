import React from "react";
import { Text } from "tamagui";
import { GetProps } from "@tamagui/core";

type Props = {
  text: string;
} & Omit<GetProps<typeof Text>, "text">;
const H1 = ({ text, ...rest }: Props) => {
  return (
    <Text color={"black"} fontWeight={"600"} fontSize="6" {...rest}>
      {text}
    </Text>
  );
};

export default H1;
