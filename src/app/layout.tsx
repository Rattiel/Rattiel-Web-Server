import {Metadata} from "next";
import React from "react";
import AmplifyProvider from "@/lib/amplify/AmplifyConfigurator";
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
                {children}
        </AmplifyProvider>
        </body>
        </html>
    )
}

export default RootLayout;
export {metadata};
