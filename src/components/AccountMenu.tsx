"use client";

import {Auth} from "aws-amplify";
import React, {useState} from 'react';
import {useAuth} from "@aws-amplify/ui-react/internal";
import NavItem from "@/components/ui/NavItem";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import {alpha} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from "@mui/icons-material/Logout";

function AccountMenu() {
    const {user} = useAuth();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    width: 40,
                    height: 40,
                    background: (theme) => alpha(theme.palette.grey[500], 0.08),
                    ...(anchorEl && {
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    }),
                }}
            >
                <Avatar
                    sx={{
                        width: 40,
                        height: 40
                    }}
                >
                    {user?.attributes?.name[0] ?? ""}
                </Avatar>
            </IconButton>
            <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                slotProps={{
                    paper: {
                        sx: {
                            p: 0,
                            mt: 1,
                            ml: 0.75,
                            width: 200,
                        },
                    }
                }}
            >
                <Box sx={{my: 1.5, px: 2}}>
                    <Typography variant="subtitle2" noWrap>
                        {`${user?.attributes?.name} 님`}
                    </Typography>
                </Box>
                <Divider/>
                <NavItem
                    icon={<LogoutIcon/>}
                    label={"로그아웃"}
                    onClick={async () => {
                        handleClose();
                        await Auth.signOut();
                    }}
                    sx={{
                        color: 'error.main',
                        opacity: "0.7",
                        py: 1.5
                    }}
                />
            </Popover>
        </>
    );
}

export default AccountMenu;
