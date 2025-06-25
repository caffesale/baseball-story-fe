import BasicImage from "@/components/base/basicImage";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { EarthIcon } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

export default function StoryCard() {
    return (
        <Card size="lg" variant="outline" className="m-3 p-3">
            <VStack space="md" className="self-end">
                <BasicImage />
                <Badge size="sm" variant="solid" action="info">
                    <BadgeIcon as={EarthIcon} />
                    <BadgeText>sample</BadgeText>
                </Badge>
                <Text>card</Text>
            </VStack>
        </Card>
    );
}

export { StoryCard };
