import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import StoryCard from "@/entities/story/ui/card";
import { TEAM_INFO } from "@/shared/utils/constants";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { Clipboard, Heart } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

export default function Stadium() {
    const { stadium } = useLocalSearchParams<{ stadium: string }>();
    const placeholderImage = TEAM_INFO["LG"]["image"];
    return (
        <View className="px-[24px]">
            <Text>here is who&apos s stadium {stadium}</Text>
            <Box className="flex flex-row">
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
                    space="md"
                    className="flex justify-center items-center bg-slate-400"
                >
                    <Heart />
                    <Text>120</Text>
                    <Link href="../home_stadium/edit" asChild>
                        <Clipboard />
                    </Link>
                </HStack>
            </Box>
            <StoryCard />
        </View>
    );
}
