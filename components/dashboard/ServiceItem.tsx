import { Image } from "react-native";
import { Text, View } from "tamagui";
import { Service } from "./laundry_services";

const ServiceItem = ({ icon, name }: Service) => {
  return (
    <View
      p="1"
      alignItems="center"
      h={55}
      w={60}
      bg="primary_light"
      mx="2"
      borderRadius="4"
    >
      <Image
        style={{ width: 25, height: 25 }}
        resizeMode="contain"
        source={icon}
      />

      <Text color={"black"} fontWeight={"600"} fontSize={11}>
        {name}
      </Text>
    </View>
  );
};

export default ServiceItem;
