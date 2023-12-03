import Link from "next/link";
import React, {ForwardedRef, forwardRef} from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";

export interface NavItemProps {
    component?: React.ElementType | undefined;
    sx?: any | undefined;
    onClick?: ((e: React.MouseEvent<React.ElementType>) => void) | undefined;
    href?: string | undefined;
    icon: React.ReactNode;
    label: string;
}

function NavItemEle({component, sx, onClick, href, icon, label}: NavItemProps, ref: ForwardedRef<React.ElementType>) {
    return (
        <ListItemButton
            ref={ref}
            component={component ?? "div"}
            {...(component == Link && {
                href: href
            })}
            sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'body2',
                color: 'text.secondary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                ...sx
            }}
            onClick={onClick}
        >
            <Box component="span" sx={{width: 24, height: 24, mr: 2}}>
                {icon}
            </Box>
            <Box component="span">{label}</Box>
        </ListItemButton>
    );
}

export default forwardRef<React.ElementType, NavItemProps>(NavItemEle);
