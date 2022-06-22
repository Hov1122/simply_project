import React, { useEffect, useState } from "react";
import "./ShowSchedule.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { fetchGroupScheduleRequest } from "../../../state-management/schedule/requests";
import { useSelector } from "react-redux";
import { schedulesSelector } from "../../../state-management/schedule/selectors";

function ShowSchedule() {
  const [loading] = useState(false);
  const data = useSelector(schedulesSelector);
  const dispatch = useDispatch();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let day = -1;

  console.log(data,'schedule');

  useEffect(() => {
    dispatch(fetchGroupScheduleRequest(1));
  }, []);

  const daySchedule = (day) => {
    return (
      <div className="Schedule-day" key={day} data-value={days[day]}>
        <h3>{days[day]}</h3>
        {data && data[day].scheduleSubject.map(element => {
          return <span key={element.subject.id}>element.subject.name</span>
        })}
      </div>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Schedule-Container">
      <div className="Schedule-Container-Header">
        <h2>Schedule</h2>
      </div>
      <div className="Schedule-Container-Main">
        {days.map(() => {
          day += 1;
          return daySchedule(day);
        })}
      </div>
    </div>
  );
}

export default ShowSchedule;
