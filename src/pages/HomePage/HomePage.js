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
    const search = JSON.parse(localStorage.getItem('search')) || ''
    const {setIsLoading} = useContext(IsLoadingContext);
    const [characters, setCharacters] = useState([]);

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

    return (
        <div className={s.container}>
            <img className={s.logo} src={logo} alt="main-logo"/>
            <SearchForm setCharacters={setCharacters}/>
            <Characters characters={characters}/>
        </div>
    );
};

export default HomePage;