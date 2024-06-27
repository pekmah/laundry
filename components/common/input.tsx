import { GetProps, Input, Label, View } from "tamagui";

type Props = { label?: string } & GetProps<typeof Input>;

const CInput = ({ label, ...rest }: Props) => {
  return (
    <View>
      {label ? (
        <Label fontWeight={"500"} color={"black"}>
          {label}
        </Label>
      ) : null}
      <Input
        backgroundColor={"$gray3Light"}
        borderWidth={1}
        borderColor={"$gray6Light"}
        color={"black"}
        {...rest}
      />
    </View>
  );
};

export default CInput;
