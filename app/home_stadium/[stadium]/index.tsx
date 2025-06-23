import BasicImage from "@/components/base/basicImage";
import ExpoMusicPlayer from "@/components/base/expoMusicPlayer";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { TEAM_INFO } from "@/shared/utils/constants";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams } from "expo-router";
import { Clipboard, EarthIcon, Heart } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

export default function Stadium() {
    const { stadium } = useLocalSearchParams<{ stadium: string }>();
    const placeholderImage = TEAM_INFO["LG"]["image"];
    return (
        <View className="px-[24px]">
            <Text>here is who&apos s stadium {stadium}</Text>
            <VStack space="lg">
                <HStack space="md">
                    <Image
                        source={placeholderImage}
                        alt="team amblem"
                        contentFit="cover"
                        style={{
                            width: 120,
                            height: 60,
                        }}
                    />
                    <HStack
                        space="sm"
                        className="flex justify-center items-center"
                    >
                        <Heart />
                        <Text>120</Text>
                    </HStack>
                    <Link href="../home_stadium/edit" asChild>
                        <Clipboard />
                    </Link>
                </HStack>
                <View className="relative">
                    <BasicImage source={placeholderImage} />
                    <LinearGradient
                        colors={[
                            "rgba(0,0,0,0)",
                            "rgba(0,0,0,0.1)",
                            "rgba(0,0,0,0.3)",
                            "rgba(0,0,0,0.7)",
                        ]}
                        className="absolute bottom-0 left-0 right-0 h-32 rounded-b-xl"
                        style={{
                            position: "absolute",
                            inset: 0,
                        }}
                    />

                    <View className="absolute bottom-0 left-0 right-0 p-6">
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
                            <Text className="text-white text-md mb-2">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Inventore, maiores omnis!
                                Mollitia cumque minima
                            </Text>
                        </VStack>
                    </View>
                </View>
                <HStack space="md">
                    <Image
                        source={placeholderImage}
                        style={{
                            width: 72,
                            height: 72,
                        }}
                    />
                    <Text
                        className="flex-auto flex-row flex-wrap"
                        ellipsizeMode="tail"
                    >
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Non alias delectus dolorum unde. Modi accusantium
                    </Text>
                </HStack>
                <View>
                    <Heading className="capitalize" size="md">
                        music Player
                    </Heading>
                </View>
                <ExpoMusicPlayer />
            </VStack>
        </View>
    );
}
