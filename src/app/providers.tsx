"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function Providers({children}:{children:React.ReactNode}) {
    return (
        <NextUIProvider locale='zh-CN'>
            <NextThemesProvider defaultTheme='light'>{children}</NextThemesProvider>
        </NextUIProvider>
    );
}
