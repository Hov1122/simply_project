import React, { useState } from "react";
import "./schedule.css";
import Loading from "../common/Loading";

function Schedule() {
  const [loading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`schedule`}>
      <h2>Schedule</h2>
    </div>
  );
}

export default Schedule;
