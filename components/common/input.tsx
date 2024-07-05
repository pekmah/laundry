import { Control, Controller, FieldError } from "react-hook-form";
import { GetProps, Input, Label, View, Text } from "tamagui";

type Props = { label?: string; error?: FieldError } & GetProps<typeof Input>;

const CInput = ({ label, error, ...rest }: Props) => {
  return (
    <View>
      {label ? (
        <Label lineHeight={"$6"} fontWeight={"500"} color={"black"}>
          {label}
        </Label>
      ) : null}
      <Input
        backgroundColor={error?.message ? "$red1Light" : "$gray3Light"}
        borderWidth={1}
        borderColor={error?.message ? "$red10Light" : "$gray6Light"}
        color={"black"}
        fontSize={13}
        {...rest}
      />
      <Text h={"auto"} fontSize={12} fontWeight={"500"} color={"$red10Light"}>
        {error?.message}
      </Text>
    </View>
  );
};

type ControlledInputProps = {
  control: Control<any, any>;
  rules?: any;
  name: string;
  handleChange?: (value: string, onChange: (...event: any[]) => void) => void;
} & Props;

export const ControlledInput = ({
  control,
  rules,
  name,
  handleChange,
  ...rest
}: ControlledInputProps) => (
  <Controller
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <CInput
        {...rest}
        onChangeText={(val) => {
          if (handleChange) {
            handleChange(val, onChange);
          } else onChange(val);
        }}
        onBlur={onBlur}
        value={value}
        error={error}
      />
    )}
    name={name}
  />
);

export default CInput;
