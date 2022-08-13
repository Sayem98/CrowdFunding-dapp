import React from "react";
import classes from "../styles/RightSide.module.css";
import CreateProject from "./CreateProject";
import AllPrject from "./AllProjects";
import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";

function RightSide() {
  return (
    <div className={classes.rightside}>
      <NavBar />
      {/* <CreateProject /> */}
      
      <Routes>
        <Route path="/" element={<AllPrject />} />
        <Route path="/create" element={<CreateProject />} />
      </Routes>
    </div>
  );
}

export default RightSide;
