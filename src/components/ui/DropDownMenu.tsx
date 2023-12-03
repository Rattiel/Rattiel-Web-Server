import React from "react";
import NavItem from "@/components/ui/NavItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

interface DropDownMenuItem {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    divider?: React.ReactNode | undefined;
}

interface DropDownMenuProps {
    menuList: Array<DropDownMenuItem>;
}

function DropDownMenu({menuList}: DropDownMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <>
            <IconButton
                sx={{
                    my: "auto"
                }}
                onClick={handleOpen}
            >
                <MoreHorizIcon fontSize="inherit"/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                backgroundColor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            }
                        }
                    }
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                MenuListProps={{
                    sx: {
                        p: 0
                    }
                }}
            >
                {menuList.map((item, index) => (
                    <Box
                        key={index}
                    >
                        {item.divider}
                        <NavItem
                            icon={item.icon}
                            label={item.label}
                            onClick={() => {
                                handleClose();
                                item.onClick();
                            }}
                        />
                    </Box>
                ))}
            </Menu>
        </>
    )
}

export default DropDownMenu;
