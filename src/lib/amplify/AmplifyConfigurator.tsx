"use client";

import React from "react";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "@/lib/amplify/config"

interface AmplifyConfiguratorProps {
    children: React.ReactNode;
}

function AmplifyConfigurator({children}: AmplifyConfiguratorProps) {
    return (
        <>
            {children}
        </>
    );
}

export default withAuthenticator(AmplifyConfigurator);
