import React, { useEffect, useState } from "react";
import "./ShowSchedule.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { fetchGroupScheduleRequest } from "../../../state-management/schedule/requests";
import { useSelector } from "react-redux";
import { schedulesSelector } from "../../../state-management/schedule/selectors";
import { authSelector } from "../../../state-management/auth/selectors";

function ShowSchedule() {
  const [loading] = useState(false);
  const {groupSchedules} = useSelector(schedulesSelector);
  const {user : {userGroup}} = useSelector(authSelector)
  const group = userGroup[0].group.id
  const dispatch = useDispatch();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = -1;

  useEffect(() => {
    dispatch(fetchGroupScheduleRequest(group));
  }, []);

  const daySchedule = (day) => {
    return (
      <div className="Schedule-day" key={day} data-value={days[day]}>
        <h3>{days[day]}</h3>
        { groupSchedules[0] &&
          groupSchedules[day].scheduleSubject.map(item => {
          return <span key={item.id}>{item.subject.name}</span>
        })
        }
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
        <div className="Schedule-Container-Main-Element">
        <div className="Schedule-day">
          <h3>Time</h3>
          <span className="Schedule-time">9:30</span>
          <span className="Schedule-time">11:10</span>
          <span className="Schedule-time">13:00</span>
          <span className="Schedule-time">14:40</span>
        </div>
        </div>
        <div className="Schedule-Container-Main-Element">
          {days.map(() => {
            day += 1;
            return daySchedule(day);
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowSchedule;
