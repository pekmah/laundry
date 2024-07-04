import { Image, Text, View } from "tamagui";
import { Service } from "./laundry_services";

const ServiceItem = ({ icon, name }: Service) => {
  return (
    <View
      p={"$1"}
      alignItems="center"
      h={65}
      w={70}
      bg={"$primary_light"}
      mx={"$2"}
      borderRadius={"$4"}
    >
      <Image
        m={"auto"}
        h={30}
        w={30}
        resizeMode="contain"
        resizeMethod="resize"
        source={icon}
      />

      <Text color={"black"} fontWeight={"600"} fontSize={11}>
        {name}
      </Text>
    </View>
  );
};

export default ServiceItem;
