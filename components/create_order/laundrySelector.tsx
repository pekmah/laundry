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

import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { LinearGradient } from "tamagui/linear-gradient";
import { PricingType } from "types/pricing";
import { Control, Controller, FieldError } from "react-hook-form";

type Props = {
  value: string;
  error?: FieldError;
  data?: PricingType[];
  isPending?: boolean;
  handleChange?: (value: string) => void;
} & SelectProps;

const LaundrySelector = ({
  value,
  native,
  size,
  error,
  data,
  isPending,
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
          bg={"$gray1Light"}
          borderColor={"$gray5Light"}
          width={"100%"}
          iconAfter={ChevronDown}
          color={"$gray11Light"}
          disabled={isPending}
        >
          <Select.Value
            color={"black"}
            placeholder={
              isPending
                ? "Fetching laundry items..."
                : "--Choose laundry item--"
            }
          />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: "spring",
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["$background", "transparent"]}
              borderRadius="$4"
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
              <Select.Label>Laundry </Select.Label>
              {/* for longer lists memoizing these is useful */}
              {useMemo(
                () =>
                  data?.map((item, i) => {
                    return (
                      <Select.Item
                        index={i}
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
                width={"$4"}
                pointerEvents="none"
              >
                <ChevronDown
                  size={getFontSize((size as FontSizeTokens) ?? "$true")}
                />
              </YStack>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["transparent", "$background"]}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
      <Text h={"auto"} fontSize={12} fontWeight={"500"} color={"$red10Light"}>
        {error?.message}
      </Text>
    </>
  );
};

export default LaundrySelector;

type ControlledSelectProps = {
  control: Control<any, any>;
  rules?: any;
  name: string;
  handleChange?: (value: string, onChange: (...event: any[]) => void) => void;
} & Props;

export const ControlledSelect = ({
  control,
  rules,
  name,
  handleChange,
  ...rest
}: ControlledSelectProps) => (
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
