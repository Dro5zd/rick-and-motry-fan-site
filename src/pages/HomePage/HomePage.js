import React, {useContext, useEffect, useState} from 'react';
import {IsLoadingContext} from "../../App";
import instance from "../../api/axios";
import requests from "../../api/requests";
import logo from '../../assets/main-logo.png'
import {SearchForm} from "../../components/SearchForm/SearchForm";
import s from './HomePage.module.css'
import Characters from "../../components/Characters/Characters";
import sortData from "../../utils/sortData";

const HomePage = () => {

    const {setIsLoading} = useContext(IsLoadingContext);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
            setIsLoading(true);

            async function fetchData() {
                let response = ''
                const search = JSON.parse(localStorage.getItem('search'));
                try {
                    !search ?
                        response = await instance.get(requests.fetchCharacters) :
                        response = await instance.get(requests.searchCharacter(search));
                    const sortedCharacters = sortData(response.data.results)
                    setCharacters(sortedCharacters)
                } catch (e) {
                    console.log(e)
                } finally {
                    setIsLoading(false);
                }
            }

            fetchData();
        }, [setIsLoading]
    );

    return (
        <div className={s.container}>
            <img className={s.logo} src={logo} alt="main-logo"/>
            <SearchForm setCharacters={setCharacters}/>
            <Characters characters={characters}/>
        </div>
    );
};

export default HomePage;