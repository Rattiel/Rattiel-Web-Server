import React from "react";
import AmplifyProvider from "@/lib/amplify/AmplifyProvider";
import ThemeRegistry from "@/lib/mui/ThemeRegistry";
import "@/lib/amplify/config";

export const metadata = {
    title: 'GrepFa',
    description: 'GrepFa',
}

export interface RootLayoutProps {
    children: React.ReactNode
}

function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="ko">
        <body>
        <AmplifyProvider>
            <ThemeRegistry>
                {children}
            </ThemeRegistry>
        </AmplifyProvider>
        </body>
        </html>
    )
}

export default RootLayout;
