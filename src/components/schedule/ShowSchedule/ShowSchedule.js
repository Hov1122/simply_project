import React, { useEffect, useState } from "react";
import "./ShowSchedule.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { fetchGroupScheduleRequest } from "../../../state-management/schedule/requests";
import { useSelector } from "react-redux";
import { schedulesSelector } from "../../../state-management/schedule/selectors";
import { authSelector } from "../../../state-management/auth/selectors";
import { addTime, randomColor } from "../../../helpers/helpers";
import { v4 as uuidv4 } from "uuid";

function ShowSchedule() {
  const [loading] = useState(false);
  const { groupSchedules } = useSelector(schedulesSelector);
  const {
    user: { userGroup },
  } = useSelector(authSelector);
  const group = userGroup[0]?.group?.id;
  const dispatch = useDispatch();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["9:30", "11:10", "13:00", "14:40", "16:20"];

  useEffect(() => {
    dispatch(fetchGroupScheduleRequest(group));
  }, []);

  const daySchedule = (index) => {
    return (
      <tr key={index}>
        <td className="align-middle">{times[index]}</td>
        {groupSchedules.map(({ scheduleSubject }) => {
          if (scheduleSubject[index].subject.name == "Free class")
            return <td style={{ backgroundColor: "#f7f7f7" }}></td>;
          return (
            <td key={uuidv4()}>
              <span
                style={{ backgroundColor: randomColor(), color: "#ffff" }}
                className="padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13"
              >
                {scheduleSubject[index].subject.name}
              </span>
              <div className="margin-10px-top font-size14">
                {times[index]}-{addTime(times[index], 90)}
              </div>
            </td>
          );
        })}
      </tr>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return userGroup.length ? (
    <div className="Schedule-Container">
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr className="bg-light-gray">
              <th className="text-uppercase">Time</th>
              <th className="text-uppercase">Monday</th>
              <th className="text-uppercase">Tuesday</th>
              <th className="text-uppercase">Wednesday</th>
              <th className="text-uppercase">Thursday</th>
              <th className="text-uppercase">Friday</th>
            </tr>
          </thead>
          <tbody>
            {days.map((el, index) => {
              return daySchedule(index);
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <span>You Dont Have Schedule For This Week</span>
  );
}

export default ShowSchedule;
