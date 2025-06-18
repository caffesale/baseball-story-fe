import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Link, usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function HomeStadium() {
    const router = useRouter();
    const pathname = usePathname();
    React.useEffect(() => {
        const random = Math.random();
        if (random >= 0.5) {
            console.log("Current segments:", pathname);
            router.replace("/home_stadium/new");
        }
    }, []);
    return (
        <View className="flex items-center">
            <HStack>
                <Link href="./edit" asChild>
                    <Button>
                        <ButtonText>홈 구장 수정</ButtonText>
                    </Button>
                </Link>
            </HStack>
            <Text>index</Text>
        </View>
    );
}
