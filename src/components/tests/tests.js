import React, { useState } from "react";
import "./Tests.css";
import Loading from "../common/Loading";

function Tests() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Tests-Container">
      <h2>Tests</h2>
    </div>
  );
}

export default Tests;
