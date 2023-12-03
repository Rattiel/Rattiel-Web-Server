import {Metadata} from "next";
import React from "react";
import ConsoleLayout from "@/components/ui/ConsoleLayout";
import AmplifyProvider from "@/lib/amplify/AmplifyProvider";
import ThemeRegistry from "@/lib/mui/ThemeRegistry";
import "@/lib/amplify/config";

const metadata: Metadata = {
    title: 'GrepFa',
    description: 'GrepFa',
}

interface RootLayoutProps {
    children: React.ReactNode
}

function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="ko">
        <body>
        <AmplifyProvider>
            <ThemeRegistry>
                <ConsoleLayout>
                    {children}
                </ConsoleLayout>
            </ThemeRegistry>
        </AmplifyProvider>
        </body>
        </html>
    )
}

export default RootLayout;
export {metadata};
