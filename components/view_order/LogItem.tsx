import moment from "moment";
import { Paragraph, View, Text, Avatar } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

const LogItem = ({
  title,
  time,
  isLast,
}: {
  title: string;
  time: string;
  isLast?: boolean;
}) => {
  return (
    <View>
      <Avatar
        position="absolute"
        left={-28}
        top={isLast ? "unset" : "$3"}
        bottom={isLast ? "$3" : "unset"}
        bg={"$primary"}
        size={"$1"}
        borderRadius={"$8"}
      >
        <Check color={"white"} size={12} />
      </Avatar>
      <Text maxWidth={"99%"} color={"black"} fontWeight={"600"} fontSize={13}>
        {title}
      </Text>

      <Paragraph fontSize={12} col={"$gray10Dark"}>
        {moment(time).format("DD MMM YYYY, hh:mm:ss a")}
      </Paragraph>
    </View>
  );
};

export default LogItem;
