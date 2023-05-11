import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import NavItem from "../../../components/NavItem";
import ROUTES from "../../../../routes/routesModel";

const LeftNavBar = () => {
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem label="about" to={ROUTES.ABOUT} />
        <NavItem label="My Cards" to={ROUTES.MY_CARDS} />
        <NavItem label="Fav Cards" to={ROUTES.FAV_CARDS} />
        <NavItem label="Sandbox" to={ROUTES.SANDBOX} />
      </Box>
    </Box>
  );
};

export default LeftNavBar;
