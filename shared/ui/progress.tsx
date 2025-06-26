import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import React from "react";
import { View } from "react-native";

interface ProgressProps {
    value: number;
}

function ProgressUI({ value = 0 }: ProgressProps) {
    return (
        <View>
            <Progress value={value} size="md" orientation="horizontal">
                <ProgressFilledTrack />
            </Progress>
        </View>
    );
}

export { ProgressUI };
