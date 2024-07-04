import { Text } from "tamagui";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <Text col={"black"} fontWeight={"600"} fontSize={15} mb={"$2"}>
      {title}
    </Text>
  );
};

export default SectionTitle;
