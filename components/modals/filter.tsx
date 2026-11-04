import { CButton, Container } from "components/common";
import { OrderReportFilters } from "lib/services/OrderServices";
import { renderSheetHeader } from "modals/AddLaundryModal";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import {
  Platform,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { H4, Text, View, XStack, YStack } from "tamagui";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export interface FilterModalRef {
  openModal: () => void;
  closeModal: () => void;
}

interface IFilterProps {
  filters: OrderReportFilters;
  setFilters: React.Dispatch<React.SetStateAction<OrderReportFilters>>;
}
const Filter = forwardRef<FilterModalRef, IFilterProps>(
  ({ setFilters, filters }, ref) => {
    const [visible, setVisible] = useState(false);
    const [_filters, _setFilters] = useState<OrderReportFilters>(filters);

    const handlePresentModal = useCallback(() => {
      _setFilters(filters);
      setVisible(true);
    }, [filters]);

    const handleDismissModal = useCallback(() => {
      setVisible(false);
    }, []);

    // imperative ref
    useImperativeHandle(ref, () => ({
      openModal: () => handlePresentModal(),
      closeModal: () => handleDismissModal(),
    }));

    const handlePressApplyFilter = useCallback(
      (duration: number) => {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - duration);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date();
        toDate.setHours(23, 59, 59, 999);

        setFilters({
          from: fromDate,
          to: toDate,
        });

        handleDismissModal();
      },
      [setFilters, handleDismissModal]
    );

    const handleFromChange = useCallback((date: Date) => {
      _setFilters((prev) => ({
        ...prev,
        from: date,
      }));
    }, []);

    const handleToChange = useCallback((date: Date) => {
      _setFilters((prev) => ({
        ...prev,
        to: date,
      }));
    }, []);

    const handleApplyFilter = useCallback(() => {
      const from = new Date(_filters.from);
      const to = new Date(_filters.to);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      if (from > to) {
        Alert.alert("Invalid date range", "The start date must not be after the end date.");
        return;
      }
      setFilters({ from, to });
      handleDismissModal();
    }, [setFilters, _filters, handleDismissModal]);

    return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={handleDismissModal}>
        <View flex={1} justifyContent="flex-end" backgroundColor="rgba(0,0,0,0.5)">
          <View backgroundColor="white" borderTopLeftRadius={20} borderTopRightRadius={20} height="70%">
            {renderSheetHeader(handleDismissModal)}
        <Container bg={"white"} py={"3"}>
          <View py="1" borderBottomWidth={1} borderColor="gray6Light">
            <H4
              lineHeight="20px"
              fontSize={17}
              color="black1"
              fontWeight="700"
              mb="1"
            >
              Report Filter
            </H4>
          </View>

          <XStack py="3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterBtnOptions?.map((opt) => (
                <CButton
                  key={opt.value}
                  letterSpacing={1}
                  borderRadius={"6"}
                  minWidth={"7"}
                  px={"2"}
                  height={"2-5"}
                  backgroundColor={"primary"}
                  mr={"1-5"}
                  onPress={() => handlePressApplyFilter(opt.value)}
                >
                  <Text fontWeight={"500"} fontSize={11} color={"whitesmoke"}>
                    {opt.title}
                  </Text>
                </CButton>
              ))}
            </ScrollView>
          </XStack>

          <YStack gap="4">
            <FilterInput
              label="From"
              placeholder="Select From date e.g. 12/1/2025"
              handleChange={handleFromChange}
              value={moment(_filters.from).format("MM/DD/YYYY")}
            />

            <FilterInput
              label="To"
              placeholder="Select to date e.g. 12/4/2025"
              handleChange={handleToChange}
              value={moment(_filters.to).format("MM/DD/YYYY")}
            />

            <CButton
              letterSpacing={1}
              borderRadius={"10"}
              px={"2"}
              backgroundColor={"primary"}
              mt={"2"}
              onPress={handleApplyFilter}
            >
              <Text fontWeight={"600"} fontSize={13} color={"whitesmoke"}>
                Apply Filter
              </Text>
            </CButton>
          </YStack>
        </Container>
          </View>
        </View>
      </Modal>
    );
  }
);

export default Filter;

const filterBtnOptions = [
  {
    title: "1 Month",
    value: 30,
  },
  {
    title: "2 Months",
    value: 60,
  },
  {
    title: "3 Months",
    value: 90,
  },
  {
    title: "6 Months",
    value: 180,
  },
  {
    title: "1 Year",
    value: 365,
  },
];

interface IFilterInputProps {
  label: string;
  value?: string;
  placeholder: string;
  handleChange: (date: Date) => void;
}

const FilterInput = ({
  label,
  value,
  placeholder,
  handleChange,
}: IFilterInputProps) => {
  const [show, setShow] = useState(false);

  const handleToggleDatePicker = () => {
    setShow((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={handleToggleDatePicker}>
      <View>
        <Text mb="1" fontWeight={700} fontSize={14} col={"gray12Light"}>
          {label}
        </Text>
        <View
          borderWidth={1}
          borderColor="gray6Light"
          p="2"
          borderRadius="3"
          height="4"
          justifyContent="center"
        >
          <Text col={!!value ? "gray12Light" : "gray8Light"} fontWeight={500}>
            {value || placeholder}
          </Text>
        </View>
      </View>

      {show && (
        <RNDateTimePicker
          mode="date"
          display="default"
          value={value && moment(value, "MM/DD/YYYY", true).isValid() ? moment(value, "MM/DD/YYYY").toDate() : new Date()}
          onChange={(_, selectedDate) => {
            setShow(Platform.OS === "ios");
            if (selectedDate) {
              handleChange(selectedDate);
            }
          }}
        />
      )}
    </TouchableOpacity>
  );
};
