import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function index() {
    return (
        <View className="mx-auto flex justify-center items-center gap-4">
            <Text>야구 스토리</Text>
            <Text>친구와 좋아하는 함께 야구 이야기를 나눠요!</Text>
            <Link href="../(auth)">회원가입하기</Link>
        </View>
    );
}

// 회원가입 여부 판단하고, 안 되어 있으면 가입시키기
