import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authSelector } from "../../../state-management/auth/selectors";
import { usersSelector } from "../../../state-management/users/selectors";
import "./UserProfile.css";
import MyProfile from "../myProfile/MyProfile";
import { getUserByIdRequest } from "../../../state-management/users/requests";

const UserProfile = () => {
  const { id: userId } = useParams();

  const {
    user: { id },
  } = useSelector(authSelector);

  const { userProfile } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByIdRequest(+userId));
  }, [dispatch, userId]);

  return +userId === id ? (
    <MyProfile />
  ) : (
    <div style={{ height: "100%", width: "100%", padding: "20px" }}>
      <div style={{ height: "75px" }}></div>
      <div className="User-Profile-Container">
        <h2 style={{ margin: "15px auto" }}>Profile</h2>
        <div className="User-Profile">
          <h3>
            First Name : <span>{userProfile?.firstName}</span>
          </h3>

          <h3>
            Last Name : <span>{userProfile?.lastName}</span>
          </h3>

          {userProfile?.role?.name === "Student" && (
            <h3>
              Average Mark :{" "}
              <span>
                {userProfile?.avgMark === -1
                  ? "-"
                  : userProfile?.avgMark.toFixed(2)}
              </span>
            </h3>
          )}

          <h3>
            Email : <span>{userProfile?.email}</span>
          </h3>

          <h3>
            Role : <span>{userProfile?.role?.name}</span>
          </h3>

          <h3>
            Group/s :{" "}
            <span>
              {userProfile?.userGroup?.length !== 0
                ? userProfile?.userGroup
                    ?.map(({ group }) => group.name)
                    .toString()
                : "-"}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
