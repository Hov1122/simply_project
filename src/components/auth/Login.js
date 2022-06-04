import React, {useEffect, useRef, useState} from 'react';
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../state-management/auth/actions';
import { authSelector } from '../../state-management/auth/selectors';

function LoginPage() {
    const emailRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');

    const { error, loading} = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        emailRef?.current?.focus();
    }, [])

    const logHandler = async () => {
        dispatch(loginRequest({email, password}));

        setTimeout(() => {
            navigate('/home');
        }, 100)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="login-container">
            <input ref={emailRef} type="text" className="email-login-input" placeholder="Enter E-mail" onChange={handleEmailChange}/>
            <input type="password" className="password-login-input" placeholder="Enter Password" onChange={handlePasswordChange}/>
            {error && <span className='login-error'>{error}</span>}
            <button disabled={!(email && password)} onClick={logHandler}>Log In</button>
        </div>
    );
}

export default LoginPage;