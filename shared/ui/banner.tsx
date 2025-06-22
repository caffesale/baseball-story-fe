import { Image, ImageSource } from "expo-image";
import React from "react";

interface BannerProps {
    source: ImageSource;
    description?: string;
}

function Banner({ source, description }: BannerProps) {
    return (
        <Image
            source={source}
            alt={`${description} banner image`}
            style={{ width: 345, height: 60, borderRadius: 16 }}
        />
    );
}
export { Banner };
