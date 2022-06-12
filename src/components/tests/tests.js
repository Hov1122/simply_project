import React, { useState } from "react";
import "./tests.css";
import Loading from "../common/Loading";

function Tests() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Tests-Container">
    
    </div>
  );
}

export default Tests;
