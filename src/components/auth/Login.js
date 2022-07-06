import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authSelector } from "../../state-management/auth/selectors";
import Loading from "../common/Loading";
import { loginRequest } from "../../state-management/auth/requests";
import { refreshTokenRequest } from "../../helpers/requests/refreshTokenRequest";
import { loginSuccess } from "../../state-management/auth/actions";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const { error, token } = useSelector(authSelector);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      (async () => {
        try {
          const response = await refreshTokenRequest();

          if (response?.data?.data?.accessToken) {
            dispatch(loginSuccess(response));
            navigate(state?.from?.pathname || "/home");
          }
        } catch (err) {
          // do nothing
        }

        setLoading(false);
      })();
    }
  }, [dispatch, navigate, state, token]);

  const logHandler = async (e) => {
    if (e.key !== "Enter" && e.type === "keydown") return;

    setLoading(true);
    dispatch(loginRequest({ email, password }));

    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 1000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Log In</h1>
        {error && (
          <>
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
            <br />
          </>
        )}

        <TextField
          variant="outlined"
          id="outlined-basic"
          label="Email"
          type="text"
          autoFocus
          sx={{ width: 350 }}
          className="email-login-input"
          onChange={handleEmailChange}
          onKeyDown={logHandler}
        />
        <br />
        <TextField
          variant="outlined"
          id="outlined-basic"
          label="Password"
          type="password"
          autoFocus
          sx={{ width: 350 }}
          className="password-login-input"
          onChange={handlePasswordChange}
          onKeyDown={logHandler}
        />

        {loading && (
          <div className="login-loading">
            <Loading />
          </div>
        )}

        <button disabled={!(email && password)} onClick={logHandler}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
