import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NavItem from "../../../components/NavItem";
import ROUTES from "../../../../routes/routesModel";

const MoreButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(open);
  };

  return (
    <>
      <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
        <IconButton
          onClick={toggleDrawer(true)}
          size="large"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Drawer anchor="top" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem onClick={()=>toggleDrawer(false)}>
            <NavItem label={"Signup"} to={ROUTES.SIGNUP} color="black" />
          </ListItem>
          <ListItem onClick={()=>toggleDrawer(false)}>
            <NavItem label={"Login"} to={ROUTES.LOGIN} color="black" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MoreButton;
