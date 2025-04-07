import React, { useCallback, useMemo } from "react";
import { Container } from "components/common";
import { ScrollView, Text, View, XStack } from "tamagui";
import { flattenInfiniteQueryData, formatToKES, getNextPrevPage } from "utils";
import { ActivityIndicator, FlatList } from "react-native";
import OrderServices, { OrderReportFilters } from "lib/services/OrderServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ILaundryOrderReport } from "lib/types/laundry";
import moment from "moment";
import { COLORS } from "constants/Colors";

const Reports = () => {
  // Date filters
  const [dateFilters, setDateFilters] = React.useState<OrderReportFilters>({
    from: new Date(new Date().setDate(new Date().getDate() - 90)),
    to: new Date(),
  });

  // Infinite query for fetching paginated reports
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["orders-report", JSON.stringify(dateFilters)],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await OrderServices.fetchOrdersReport(
        dateFilters,
        pageParam
      );
      return {
        orders: response.orders,
        totalAmount: response.totalAmount,
        meta: response.meta,
      };
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten the paginated data
  const flattenedOrders = useMemo<ILaundryOrderReport[]>(
    () => (data?.pages ? flattenInfiniteQueryData(data.pages, "orders") : []),
    [data?.pages]
  );

  const renderTopOrderItem = useCallback(
    ({ item }: { item: ILaundryOrderReport }) => {
      return (
        <View
          key={item.id}
          padding={"$2"}
          borderBottomWidth={1}
          borderColor={"$primary_light"}
        >
          <Text fontSize={12} col={"$gray10Light"} fontWeight={"600"}>
            {moment(item.createdAt).format("MMM DD, YYYY")}
          </Text>

          <XStack>
            <Text flex={1} col={"$gray12Light"} fontWeight={"700"}>
              Order #{item.orderNumber}
            </Text>
            <Text
              flex={1}
              col={"$gray12Light"}
              textTransform="uppercase"
              fontWeight={"700"}
            >
              {formatToKES(item.paymentAmount, " ")}
            </Text>
          </XStack>
          <XStack>
            <Text
              fontSize={12}
              flex={1}
              col={"$gray11Light"}
              fontWeight={"500"}
            >
              {item.customerName}
            </Text>
            <Text
              fontSize={12}
              flex={1}
              col={"$gray11Light"}
              textTransform="uppercase"
              fontWeight={"500"}
            >
              {item.customerPhone}
            </Text>
          </XStack>
        </View>
      );
    },
    []
  );

  const renderListHeader = useCallback(() => {
    return (
      <View>
        <View>
          <Text fontWeight={"600"} col={"$gray12Light"} fontSize={15}>
            Laundry Report
          </Text>
          {/* Description */}
          <Text fontWeight={600} col={"$gray10Light"} fontSize={12}>
            From {moment(dateFilters.from).format("MMM DD, YYYY")} to{" "}
            {moment(dateFilters.to).format("MMM DD, YYYY")}
            {/* {JSON.stringify(flattenedOrders, null, 2)} */}
          </Text>
        </View>

        <XStack pt={"$2"} gap={"$3"}>
          {/* Total sales (based on selected duration) */}
          <StatsItem
            value={formatToKES(data?.pages[0]?.totalAmount || 0)}
            title="Total Sales"
          />
          {/* Number of orders */}
          <StatsItem
            value={data?.pages[0]?.meta?.totalCount || 0}
            title="Total Orders"
          />
        </XStack>

        <XStack pt={"$3"} pb={"$1"} gap={"$2"} alignItems="center">
          <View bg={"$primary"} width={4} height={24} borderRadius={"$2"} />
          <Text mt={5} fontWeight={"700"} col={"$gray12Light"} fontSize={15}>
            Top Orders
          </Text>
        </XStack>
      </View>
    );
  }, [flattenedOrders, data?.pages, dateFilters]);

  const renderListFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <XStack justifyContent="center" alignItems="center" gap={"$2"} py={"$3"}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text fontWeight={"500"} fontSize={12} color={COLORS.primary}>
          Loading more . . .
        </Text>
      </XStack>
    );
  }, [isFetchingNextPage]);

  return (
    <Container py={"$2"} flex={1} bg={"$gray2Light"}>
      {/* List of top orders */}
      <FlatList
        refreshing={isFetchingNextPage || isPending}
        onRefresh={refetch}
        ListHeaderComponent={renderListHeader}
        data={flattenedOrders}
        renderItem={renderTopOrderItem}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={2}
        ListFooterComponent={renderListFooter}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Reports;

const StatsItem = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <View
    bg={"$primary_light"}
    flex={1}
    borderRadius={"$3"}
    padding={"$3"}
    px={"0"}
    minHeight={70}
    alignItems="center"
    justifyContent="center"
  >
    <Text mt={"$2"} fontWeight={700} col={"$gray12Light"} fontSize={16}>
      {value}
    </Text>
    <Text fontWeight={"500"} col={"$gray11Light"} fontSize={14}>
      {title}
    </Text>
  </View>
);
