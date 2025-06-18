import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Link, usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function HomeStadium() {
    const router = useRouter();
    const pathname = usePathname();
    React.useEffect(() => {
        if (true) {
            console.log("Current segments:", pathname);
            router.replace("/home_stadium/new");
        }
    }, []);
    return (
        <View className="flex items-center">
            <HStack>
                <Link href="./edit" asChild>
                    <Button>
                        <Text>홈 구장 수정</Text>
                    </Button>
                </Link>
            </HStack>
            <Text>index</Text>
        </View>
    );
}
