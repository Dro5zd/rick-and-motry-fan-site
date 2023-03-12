import React from 'react';
import backIcon from '../../assets/arrow_back.svg'
import s from './BackButton.module.css'
import {useLocation} from "react-router-dom";

const BackButton = () => {
    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/";
    return (
        <a className={s.backWrapper} href={backLinkHref}>
            <img className={s.backIcon} src={backIcon} alt={'back'}/>
            <p className={s.backSpan}>GO BACK</p>
        </a>
    );
};

export default BackButton;