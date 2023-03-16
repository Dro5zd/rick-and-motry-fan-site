import React, {useContext, useEffect, useState} from 'react';
import {IsLoadingContext} from "../../App";
import instance from "../../api/axios";
import requests from "../../api/requests";
import logo from '../../assets/main-logo.png'
import logout from '../../assets/logout.svg'
import {SearchForm} from "../../components/SearchForm/SearchForm";
import s from './HomePage.module.css'
import Characters from "../../components/Characters/Characters";
import sortData from "../../utils/sortData";
import {ModalConfirm} from "../../components/ModalConfirm/ModalConfirm";
import {Link} from "react-router-dom";

const HomePage = () => {
    const search = JSON.parse(localStorage.getItem('search')) || ''
    const profile = JSON.parse(localStorage.getItem('profile')) || ''
    const {setIsLoading} = useContext(IsLoadingContext);
    const [characters, setCharacters] = useState([]);
    const [show, setShow] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await instance.get(
                    search ? requests.searchCharacter(search) : requests.fetchCharacters
                );
                const sortedCharacters = sortData(response.data.results);
                setCharacters(sortedCharacters);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [search, setIsLoading]);

    const onCloseHandler = () => {
        setShow(!show)
    }
    const onQuitHandler = () => {
        localStorage.setItem('profile', JSON.stringify(''));
        setShow(false)
    }

    return (
        <div className={s.container}>
            {profile === '' ? <Link className={s.loginLink} to="/login">Sign In</Link> :
                <div className={s.userWrapper}>
                    <img className={s.userImg} src={profile.picture.data.url} alt="user-avatar"/>
                    <h4 className={s.userName} >{profile.name}</h4>
                    <img className={s.logoutImg} src={logout} onClick={onCloseHandler} alt='logout'/>
                </div>}
            <img className={s.logo} src={logo} alt="main-logo"/>
            <SearchForm setCharacters={setCharacters}/>
            <Characters characters={characters}/>
            {show ? (
                <ModalConfirm onClose={onCloseHandler} onQuit={onQuitHandler}/>
            ) : null}
        </div>
    );
};

export default HomePage;