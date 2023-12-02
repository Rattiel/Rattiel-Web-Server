"use client";

import React from "react";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "@/lib/amplify/config"

interface AmplifyAuthProviderProps {
    children: React.ReactNode;
}

function AmplifyProvider({children}: AmplifyAuthProviderProps) {
    return (
        <>{children}</>
    );
}

export default withAuthenticator(AmplifyProvider);
