import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function index() {
    return (
        <View className="mx-auto flex justify-center items-center gap-4">
            <Heading>약관동의</Heading>
            <Link href="../home_stadium" asChild>
                <Button className="text-white">
                    <ButtonText>동의합니다.</ButtonText>
                </Button>
            </Link>
        </View>
    );
}
