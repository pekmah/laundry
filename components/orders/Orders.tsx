/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, FlatListProps } from "react-native";
import React from "react";

import { ILaundryOrder } from "types/laundry";
import OrderItem from "./OrderItem";

type Props = { orders: ILaundryOrder[] } & Partial<FlatListProps<any>>;
const Orders = ({ orders = [], ...rest }: Props) => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem key={item.id} {...item} />}
      scrollEnabled={false} // allow scrolling if not explicitly disabled
      {...rest}
    />
  );
};

export default Orders;

// status: create, processing, complete, cancelled, collected
