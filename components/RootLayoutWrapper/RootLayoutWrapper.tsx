"use client";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";

export function RootLayoutWrapper({ children }) {
    return (
        <RecoilRoot>
            <ChakraProvider>{children}</ChakraProvider>
        </RecoilRoot>
    );
}
