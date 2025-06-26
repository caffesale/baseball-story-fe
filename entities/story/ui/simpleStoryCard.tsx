import BasicImage from "@/components/base/basicImage";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { VStack } from "@/components/ui/vstack";
import { EarthIcon } from "lucide-react-native";
import { Text, View } from "react-native";

function SimpleStoryCard() {
    return (
        <View>
            <BasicImage />
            <VStack space="sm">
                <Badge
                    className="self-start"
                    size="sm"
                    variant="solid"
                    action="info"
                >
                    <BadgeIcon as={EarthIcon} />
                    <BadgeText>sample</BadgeText>
                </Badge>
                <Text className="text-md mb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore, maiores omnis! Mollitia cumque minima
                </Text>
            </VStack>
        </View>
    );
}
export { SimpleStoryCard };
