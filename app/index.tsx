import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function index() {
    return (
        <View className="mx-auto flex justify-center items-start gap-4">
            <Heading>야구 스토리</Heading>
            <Text>친구와 좋아하는 함께 야구 이야기를 나눠요!</Text>
            <Link href="../auth" asChild>
                <Button className="text-white">
                    <ButtonText>회원가입하기</ButtonText>
                </Button>
            </Link>
        </View>
    );
}
