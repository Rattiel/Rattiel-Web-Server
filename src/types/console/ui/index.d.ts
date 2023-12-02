module "console/ui" {
    import React from "react";
    
    interface NavItem {
        label: string;
        icon: React.ReactNode;
        path: string;
    }
    
    export interface DropDownMenuItem {
        label: string;
        icon: React.ReactNode;
        onClick: () => void;
        divider?: React.ReactNode | undefined;
    }
}
