import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function HomeStadium() {
    return (
        <View className="flex items-center">
            <HStack>
                <Link href="../home_stadium/new" asChild>
                    <Button>
                        <ButtonText>홈 구장 생성</ButtonText>
                    </Button>
                </Link>
            </HStack>
            <Text>index</Text>
        </View>
    );
}
