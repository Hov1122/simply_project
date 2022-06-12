import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authSelector } from "../../state-management/auth/selectors";
import Loading from "../common/Loading";
import { loginRequest } from "../../state-management/auth/requests";
import { refreshTokenRequest } from "../../helpers/requests/refreshTokenRequest";
import { loginSuccess } from "../../state-management/auth/actions";

function LoginPage() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const { error, token } = useSelector(authSelector);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef?.current?.focus();

    if (!token) {
      (async () => {
        const response = await refreshTokenRequest();

        if (response?.data?.data?.accessToken) {
          dispatch(loginSuccess(response));
          navigate(state?.from?.pathname || "/home");
        }

        setLoading(false);
      })();
    }
  }, [dispatch, navigate, state, token]);

  const logHandler = async () => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <h1 style={{ color: "purple" }}>Log In</h1>
      <input
        ref={emailRef}
        type="text"
        className="email-login-input"
        placeholder="Enter E-mail"
        onChange={handleEmailChange}
      />
      <input
        type="password"
        className="password-login-input"
        placeholder="Enter Password"
        onChange={handlePasswordChange}
      />
      {error && <span className="login-error">{error}</span>}
      <button disabled={!(email && password)} onClick={logHandler}>
        Log In
      </button>
    </div>
  );
}

export default LoginPage;
