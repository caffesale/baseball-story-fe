import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function index() {
    return (
        <View>
            <Text>약관동의</Text>
            <Link href="../(home_stadium)">동의합니다.</Link>
        </View>
    );
}
