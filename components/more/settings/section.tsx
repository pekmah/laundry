import { View, Text } from "tamagui";
import React from "react";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
    <View borderBottomWidth={1} borderColor={"$gray6Light"} pb={"$3"} mb={"$3"}>
        <Text
            fontWeight={"700"}
            fontSize={16}
            col={"$gray12Light"}
            textTransform="capitalize"
        >
            {title}
        </Text>
        {/* Add your section content here */}
        <View py={"$1"} pl={"$2"}>
            {children}
        </View>
    </View>
);

export default Section;
