import { FlatList, ImageSourcePropType } from "react-native";
import { Text, View } from "tamagui";

import ServiceItem from "./ServiceItem";
import clothes from "assets/icons/clothes.png";
import laundry from "assets/icons/laundry.png";
import iron from "assets/icons/iron.png";
import carpet from "assets/icons/carpet.png";
import shoes from "assets/icons/shoes.png";

const Services = () => {
  return (
    <View py={"$2"}>
      <Text col={"black"} fontWeight={"600"} fontSize={15} mb={"$2"}>
        Services offered
      </Text>

      <FlatList
        data={services}
        renderItem={({ item }) => <ServiceItem {...item} key={item.name} />}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Services;

export type Service = {
  name: string;
  icon: ImageSourcePropType;
};

const services: Service[] = [
  {
    name: "Washing",
    icon: laundry,
  },
  {
    name: "Ironing",
    icon: iron,
  },
  {
    name: "Dry Clean",
    icon: clothes,
  },
  {
    name: "Carpets",
    icon: carpet,
  },
  {
    name: "Shoes",
    icon: shoes,
  },
];
