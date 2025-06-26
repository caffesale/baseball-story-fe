import { Image, ImageSource } from "expo-image";
import React from "react";
import { ImageStyle, StyleProp } from "react-native";

interface BannerProps {
    source: ImageSource;
    description?: string;
    className?: string;
    selected?: boolean;
    style?: StyleProp<ImageStyle>;
}

function Banner({
    source,
    description,
    className,
    selected,
    style,
}: BannerProps) {
    return (
        <Image
            source={source}
            alt={`${description ?? ""} banner image`}
            className={className}
            style={[
                {
                    width: 345,
                    height: 60,
                    borderRadius: 16,
                    resizeMode: "contain",
                    borderWidth: selected ? 2 : 0,
                    borderColor: selected ? "#007AFF" : "transparent",
                },
                style,
            ]}
        />
    );
}
export { Banner };
