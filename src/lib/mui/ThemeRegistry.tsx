"use client";

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {NextAppDirEmotionCacheProvider} from "@/lib/mui/EmotionCache";
import defaultTheme from "@/lib/mui/theme";
import "moment/locale/ko";

export interface ThemeRegistryProps {
    children: React.ReactNode
}

export default function ThemeRegistry({children}: ThemeRegistryProps) {
    return (
        <NextAppDirEmotionCacheProvider options={{key: "mui"}}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
