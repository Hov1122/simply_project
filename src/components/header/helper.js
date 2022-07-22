import React from "react"; // { useEffect, useState }
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { NavLink } from "react-router-dom";

export const HeaderPagePart = () => {
  return (
    <div className="header-page-part">
      <div>
        <NavLink className="header-home-image" to="/home">
          <HomeSharpIcon sx={{ color: "#344767" }} />
          <span className="header-home-link">{"Home"}</span>
        </NavLink>
      </div>
    </div>
  );
};
