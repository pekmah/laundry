import { Image, Text, View } from "tamagui";
import OfferImg from "assets/images/offer.jpg";
const Offers = () => {
  return (
    <View my={"$3"}>
      <Text col={"black"} fontWeight={"600"} fontSize={15} mb={"$2"}>
        Latest Offers
      </Text>

      <View overflow="hidden" borderRadius={"$4"} position="relative">
        <Image
          src={OfferImg}
          h={150}
          w={"100%"}
          resizeMode="cover"
          maskPosition={"center"}
        />

        <View position="absolute" top={"$1"} left={"$3"}>
          <Text
            style={{ fontFamily: "praise" }}
            fontSize={24}
            color={"$gray11Light"}
          >
            Special season Offer
          </Text>
          <Text fontSize={16} fontWeight={"700"}>
            30% OFF
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Offers;
