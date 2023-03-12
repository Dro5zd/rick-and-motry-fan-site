import React, {useCallback, useContext, useEffect, useState} from 'react';
import Notifier from 'notiflix';
import {useSearchParams} from 'react-router-dom';
import instance from "../../api/axios";
import requests from "../../api/requests";
import {IsLoadingContext} from "../../App";
import s from './SearchForm.module.css'
import searchIcon from '../../assets/search-icon.svg'
import sortData from "../../utils/sortData";

const _debounce = require('lodash/debounce');

export const SearchForm = ({setCharacters}) => {
    const [inputValue, setInputValue] = useState(JSON.parse(localStorage.getItem('search')))
    const [searchParams, setSearchParams] = useSearchParams('');
    searchParams.get('name');

    useEffect(() => {
        if (inputValue) {
            handleDebounceFn(inputValue)
        }
    }, [searchParams]);

    useEffect(() => {
        localStorage.setItem('search', JSON.stringify(inputValue));
    }, [inputValue]);

    useEffect(() => {
        const search = JSON.parse(localStorage.getItem('search'));
        if (search) {
            setSearchParams({name: search});
        }
    }, [setSearchParams]);


    const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

    const {setIsLoading} = useContext(IsLoadingContext);

    function handleDebounceFn(inputValue) {
        setIsLoading(true);

        async function fetchData() {
            try {
                const response = await instance.get(requests.searchCharacter(inputValue));
                const sortedCharacters = sortData(response.data.results)
                setCharacters(sortedCharacters)
                setSearchParams({name: inputValue})
                if (inputValue.trim() === '') {
                    setSearchParams('')
                }

            } catch (e) {
                Notifier.Notify.failure('There is nothing here')
                console.log(e)
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }

    const onChangeHandler = (e) => {
        setInputValue(e.target.value.toLowerCase())
        debounceFn(e.target.value.toLowerCase());
    };

    return (
        <div className={s.inputWrapper}>
            <input
                className={s.searchInput}
                onChange={onChangeHandler}
                type="text"
                autoComplete="off"
                value={inputValue}
                autoFocus
                placeholder="Filter by name..."
            />
            <img className={s.searchIcon} src={searchIcon} alt={'search'}/>
        </div>
    );
}