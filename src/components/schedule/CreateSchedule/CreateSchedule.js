import React, { useEffect, useState } from "react";
import "./CreateSchedule.css";
import Loading from "../../common/Loading";
import { useDispatch } from "react-redux";
import { createScheduleRequest } from "../../../state-management/schedule/requests";
import { fetchSubjectsRequest } from "../../../state-management/subjects/requests";
import { fetchGroupsRequest } from "../../../state-management/groups/requests";
import { useSelector } from "react-redux";
import { subjectsSelector } from "../../../state-management/subjects/selectors";
import { groupsSelector } from "../../../state-management/groups/selectors";
import Select from "react-select";

function ScheduleCreater() {
  const [loading] = useState(false);
  const { subjects } = useSelector(subjectsSelector);
  const { groups } = useSelector(groupsSelector);
  const dispatch = useDispatch();
  const [scheduleSubjects, setScheduleSubjects] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  const subjectsArr = subjects.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });
  const groupsArr = groups.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let day = -1;
  let subjectId = [0, 1, 2, 3];

  const daySchedule = (day) => {
    return (
      <div className="Schedule-day" data-value={days[day]}>
        <h3>{days[day]}</h3>
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[0]}
          onChange={(e) => {
            handleChangeSubject(days[day], subjectId[0], e);
          }}
        />
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[1]}
          onChange={(e) => {
            handleChangeSubject(days[day], subjectId[1], e);
          }}
        />
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[2]}
          onChange={(e) => {
            handleChangeSubject(days[day], subjectId[2], e);
          }}
        />
        <Select
          options={subjectsArr}
          placeholder="Subject"
          key={subjectId[3]}
          onChange={(e) => {
            handleChangeSubject(days[day], subjectId[3], e);
          }}
        />
      </div>
    );
  };

  const handleChangeSubject = (day, pos, e) => {
    setScheduleSubjects((elem) => {
      elem[day][pos] = e.value;
      return elem;
    });
  };

  useEffect(() => {
    dispatch(fetchSubjectsRequest());
    dispatch(fetchGroupsRequest());
  }, []);

  // ADD SCHEDULE IN DATABASE
  const addSchedule = () => {
    console.log(scheduleSubjects);
    const data = {};

    console.log(data);
    dispatch(createScheduleRequest(data));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Schedule-Container">
      <div className="Schedule-Container-Header">
        <h2>Create Schedule</h2>
        <Select options={groupsArr} placeholder="Group" />
      </div>
      <div className="Schedule-Container-Main">
        {days.map(() => {
          day += 1;
          subjectId.forEach((elem) => elem + 4);
          return daySchedule(day);
        })}
      </div>
      <div className="Schedule-Container-Foot">
        <input value="Add Schedule" type="button" onClick={addSchedule} />
      </div>
    </div>
  );
}

export default ScheduleCreater;
