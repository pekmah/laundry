import { FlatList, FlatListProps } from "react-native";

import { ILaundryOrder, LaundryOrderType } from "types/laundry";
import OrderItem from "./OrderItem";

type Props = { orders: ILaundryOrder[] } & Partial<FlatListProps<any>>;
const Orders = ({ orders = [], ...rest }: Props) => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem key={item.id} {...item} />}
      scrollEnabled={false}
      {...rest}
    />
  );
};

export default Orders;

// status: create, processing, complete, cancelled, collected
