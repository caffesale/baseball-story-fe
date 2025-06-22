import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Stadium() {
    const { stadium } = useLocalSearchParams<{ stadium: string }>();
    return (
        <View>
            <Text>index {stadium}</Text>
        </View>
    );
}
