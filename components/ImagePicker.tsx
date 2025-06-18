import { Button, ButtonText } from "@/components/ui/button";
import React from "react";

interface ImagePickerProps {
    pickImageAsync: () => Promise<void>;
}

export default function ImagePicker({ pickImageAsync }: ImagePickerProps) {
    return (
        <Button
            action="primary"
            variant="solid"
            size="md"
            onPress={pickImageAsync}
        >
            <ButtonText>choose a image</ButtonText>
        </Button>
    );
}
