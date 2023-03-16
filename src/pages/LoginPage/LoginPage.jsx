import React from 'react';
import {
    LoginSocialFacebook,
} from 'reactjs-social-login'
import {
    FacebookLoginButton
} from 'react-social-login-buttons';
import {useNavigate} from "react-router-dom";
import s from './LoginPage.module.css'
import logo from '../../assets/main-logo.png'
import BackButton from "../../components/BackButton/BackButton";

const LoginPage = () => {

    const navigate = useNavigate();

    return (
        <div className={s.container}>
            <BackButton/>
            <div className={s.card}>
                <img src={logo} alt="logo"/>
                <h2 className={s.cardTitle}>Welcome</h2>
                <LoginSocialFacebook
                    appId='517458353885945'
                    onResolve={(response) => {
                        localStorage.setItem('profile', JSON.stringify(response.data));
                        navigate("/")
                    }}
                    onReject={err => {
                        console.log(err);
                    }}>
                    <FacebookLoginButton/>
                </LoginSocialFacebook>
            </div>
        </div>
    );
};

export default LoginPage;