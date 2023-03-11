import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SearchFormInput} from './SearchForm.styled';
// import Notiflix from 'notiflix';
import {useSearchParams} from 'react-router-dom';
import instance from "../../api/axios";
import requests from "../../api/requests";
import {IsLoadingContext} from "../../App";
const _debounce = require('lodash/debounce');

export const SearchForm = ({setCharacters}) => {
    const [inputValue, setInputValue] = useState(JSON.parse(localStorage.getItem('search')))
    const [searchParams, setSearchParams] = useSearchParams('');
    searchParams.get('name');

    useEffect(() => {
        if(inputValue){
        handleDebounceFn(inputValue)
        }
    }, [searchParams]);

    useEffect(() => {
        localStorage.setItem('search', JSON.stringify(inputValue));
    }, [inputValue]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('search'));
        if (items) {
            setSearchParams({name: items});
        }
    }, []);

    const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

    const {setIsLoading} = useContext(IsLoadingContext);
    function handleDebounceFn(inputValue) {
        setIsLoading(true);
        async function fetchData() {
            try {
                const response = await instance.get(requests.searchCharacter(inputValue));
                const sortedCharacters = response.data.results.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                })
                setCharacters(sortedCharacters)
                setSearchParams({name: inputValue})
                if (inputValue.trim() === '') {
                    setSearchParams('')
                    // return Notiflix.Notify.failure('Sorry, but you didn\'t enter anything. Please try again.');
                   }

            } catch (e) {
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
            <SearchFormInput
                onChange={onChangeHandler}
                type="text"
                autoComplete="off"
                value={inputValue}
                autoFocus
                placeholder="Filter by name..."
            />
    );
}