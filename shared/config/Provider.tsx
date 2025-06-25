import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function Provider({ children }: PropsWithChildren) {
    return (
        <GluestackUIProvider mode="light">
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>{children}</SafeAreaProvider>
            </QueryClientProvider>
        </GluestackUIProvider>
    );
}
