import { Stack } from "expo-router";

import "@/global.css";
import Provider from "@/shared/config/Provider";

export default function RootLayout() {
    return (
        <Provider>
            <Stack />
        </Provider>
    );
}
