import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Link } from "@mui/material";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Account">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt="user-account"
            sx={{
              width: 40,
              height: 40,
            }}
            className="bg-gray-500  "
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "primary.dark",
            "&.MuiPaper-root": {
              borderRadius: 3,
              color: "black",
            },
            "& .MuiAvatar-root": {
              width: 30,
              height: 30,
              ml: -0.5,
              mr: 2,
            },
            "& .MuiMenu-list": {
              padding: "4px 8px",
            },
            "& .MuiMenuItem-root": {
              color: "white",
              paddingY: "10px",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "primary.dark",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <Link to="/profile" component={RouterNavLink}>
          <MenuItem>
            <Avatar sx={{ backgroundColor: "white", color: "black" }} /> Profile
          </MenuItem>
        </Link>
       

       
        <MenuItem>
          <ListItemIcon>
            <Logout
              fontSize="small"
              sx={{
                color: "secondary.main",
              }}
            />
          </ListItemIcon>
          Logout
        </MenuItem> */}
        <Link to="/signin" component={RouterNavLink}>
          <MenuItem>
            <Avatar sx={{ backgroundColor: "white", color: "black" }} /> Sign in
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}
