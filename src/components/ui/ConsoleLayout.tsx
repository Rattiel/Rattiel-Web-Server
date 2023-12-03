import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AccountMenu from "@/components/AccountMenu";

interface ConsoleLayoutProps {
    children: React.ReactNode
}

function ConsoleLayout({children}: ConsoleLayoutProps) {
    return (
        <Stack>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    p: 1
                }}
            >
                <AccountMenu/>
            </Box>
            <Box>
                {children}
            </Box>
        </Stack>
    )
}

export default ConsoleLayout;
