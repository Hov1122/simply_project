import React from "react"; // { useEffect, useState }
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { NavLink } from "react-router-dom";

export const HeaderPagePart = () => {
  return (
    <div className="header-page-part">
      <div>
        <NavLink
          style={{
            textDecoration: "none",
            color: "#344767",
            marginLeft: "15px",
            marginTop: "18px",
            display: "flex",
          }}
          to="/home"
        >
          <HomeSharpIcon sx={{ color: "#344767" }} />
          <b>{"Home"}</b>
        </NavLink>
      </div>
    </div>
  );
};
