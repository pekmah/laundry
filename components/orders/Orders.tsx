import { FlatList, FlatListProps } from "react-native";
import { OrderType } from "types/order";
import OrderItem from "./OrderItem";

const Orders = ({ ...rest }: Partial<FlatListProps<any>>) => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem key={item.id} {...item} />}
      keyExtractor={(item) => item.name}
      scrollEnabled={false}
      {...rest}
    />
  );
};

export default Orders;

const orders: OrderType[] = [
  {
    id: 1,
    name: "John Doe",
    stage: "processing",
    date: new Date(),
  },
  {
    id: 2,
    name: "John Doe",
    stage: "create",
    date: new Date(),
  },
  {
    id: 3,
    name: "John Smith",
    stage: "complete",
    date: new Date(),
  },
  {
    id: 4,
    name: "Jane Smith",
    stage: "processing",
    date: new Date(),
  },
  {
    id: 5,
    name: "Ben Ten",
    stage: "processing",
    date: new Date(),
  },
];

// status: create, processing, complete, cancelled, collected
