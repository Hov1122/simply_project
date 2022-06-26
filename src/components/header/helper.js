import React from "react"; // { useEffect, useState } 
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import { NavLink } from "react-router-dom";


export const HeaderPagePart = () => {
//   const [pageName, setName] = useState('')

//   useEffect


  return (
    <div className="header-page-part">
      <div className="first-line-header">
        <NavLink to="/home">
          <HomeSharpIcon sx={{ color: "#344767" }} />
        </NavLink>
        <NavLink to="/home">{"Home"}</NavLink>
      </div>
      <div className="second-line-header">
        <b>Header</b>
      </div>
    </div>
  );
};
