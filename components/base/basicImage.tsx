import { TEAM_INFO } from "@/shared/utils/constants";
import { Image } from "expo-image";
import React from "react";
import { Dimensions, View } from "react-native";

// interface BasicImageProps {
//     source: ImageSource;
// }

const BasicImage = () => {
    const { width: screenWidth } = Dimensions.get("window");
    // const imageWidth = screenWidth - 48;
    // const imageHeight = imageWidth * (9 / 16);

    const placeholderImage = TEAM_INFO["LG"]["image"];
    return (
        <View className="relative">
            <Image
                source={placeholderImage}
                style={{
                    width: 300,
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
