import React, { useState } from "react";
import "./Tests.css";
import Loading from "../common/Loading";

function Tests() {
  const [loading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return <div className="Tests-Container"></div>;
}

export default Tests;
