import * as ImgPicker from "expo-image-picker";
import React from "react";

export default function useImage() {
    const [img, setImg] = React.useState<
        ImgPicker.ImagePickerResult | undefined
    >();
    const pickImageAsync = async () => {
        let result = await ImgPicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImg(result);
        }
    };
    return {
        pickImageAsync,
        img,
    };
}
