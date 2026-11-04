import { useMemo } from "react";
import {
  Adapt,
  FontSizeTokens,
  Select,
  SelectProps,
  Sheet,
  Text,
  YStack,
  getFontSize,
} from "tamagui";

import { Check, ChevronDown, ChevronUp } from "components/icons";
import { LinearGradient } from "tamagui/linear-gradient";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

type Props = {
  value?: string;
  error?: FieldError;
  data?: any[];
  isPending?: boolean;
  placeholder?: string;
  groupLabel?: string;
  handleChange?: (value: string) => void;
} & SelectProps;

const LaundrySelector = ({
  value,
  native,
  size,
  error,
  data,
  isPending,
  placeholder,
  groupLabel = "Laundry",
  handleChange = () => {},
  ...rest
}: Props) => {
  return (
    <>
      <Select
        value={value ?? ""}
        onValueChange={handleChange}
        disablePreventBodyScroll
        {...rest}
      >
        <Select.Trigger
          bg="gray1Light"
          borderColor="gray5Light"
          width={"100%"}
          disabled={isPending}
        >
          <Select.Value color="gray11Light" placeholder={placeholder} />
          <ChevronDown size={20} />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!native}
            modal
            dismissOnSnapToBottom
          >
            <Sheet.Container>
              <Sheet.Background />
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Container>
            <Sheet.Overlay
              transition="lazy"
              opacity="enter:0 exit:0"
            />
          </Sheet>
        </Adapt>

        <Select.Content>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              borderRadius="4"
              position="absolute" inset={0}
              colors={["background", "transparent"]}
            />
          </Select.ScrollUpButton>

          <Select.Viewport
            // to do animations:
            // animation="quick"
            // animateOnly={['transform', 'opacity']}
            // enterStyle={{ o: 0, y: -10 }}
            // exitStyle={{ o: 0, y: 10 }}
            minWidth={200}
          >
            <Select.Group>
              <Select.Label>{groupLabel}</Select.Label>
              {/* for longer lists memoizing these is useful */}
              {useMemo(
                () =>
                  data?.map((item, i) => {
                    return (
                      <Select.Item
                        key={item.name}
                        value={item.id.toString()}
                      >
                        <Select.ItemText>{item.name}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  }),
                [data]
              )}
            </Select.Group>
            {/* Native gets an extra icon */}
            {native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width="4"
                pointerEvents="none"
              >
                <ChevronDown
                  size={getFontSize((size as FontSizeTokens) ?? true)}
                />
              </YStack>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              borderRadius="4"
              position="absolute" inset={0}
              colors={["transparent", "background"]}
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
      <Text h={"auto"} fontSize={12} fontWeight={"500"} color="red10Light">
        {error?.message}
      </Text>
    </>
  );
};

export default LaundrySelector;

type ControlledSelectProps<T extends FieldValues> = {
  control: Control<T>;
  rules?: any;
  name: Path<T>;
  handleChange?: (value: string, onChange: (...event: any[]) => void) => void;
} & Props;

export const ControlledSelect = <T extends FieldValues>({
  control,
  rules,
  name,
  handleChange,
  ...rest
}: ControlledSelectProps<T>) => (
  <Controller
    control={control}
    rules={rules}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <LaundrySelector
        {...rest}
        handleChange={onChange}
        value={value}
        error={error}
      />
    )}
    name={name}
  />
);
