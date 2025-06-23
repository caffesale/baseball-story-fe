import { Image, ImageSource } from "expo-image";
import React from "react";
import { Dimensions, View } from "react-native";

interface BasicImageProps {
    source: ImageSource;
}

const BasicImage = ({ source }: BasicImageProps) => {
    const { width: screenWidth } = Dimensions.get("window");
    // const imageWidth = screenWidth - 48;
    // const imageHeight = imageWidth * (9 / 16);

    return (
        <View>
            <Image
                source={source}
                style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    borderRadius: 12,
                }}
                contentFit="cover"
                transition={1000}
            />
        </View>
    );
};

export default BasicImage;
