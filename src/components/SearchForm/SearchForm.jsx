import React, { useCallback, useContext, useEffect, useState } from 'react';
import Notifier from 'notiflix';
import { useSearchParams } from 'react-router-dom';
import instance from '../../api/axios';
import requests from '../../api/requests';
import { IsLoadingContext } from '../../App';
import s from './SearchForm.module.css';
import searchIcon from '../../assets/search-icon.svg';
import sortData from '../../utils/sortData';
import debounce from 'lodash/debounce';

export const SearchForm = ({ setCharacters }) => {
    const [inputValue, setInputValue] = useState(
        JSON.parse(localStorage.getItem('search')) || ''
    );
    const [, setSearchParams] = useSearchParams('');

    useEffect(() => {
        localStorage.setItem('search', JSON.stringify(inputValue));
    }, [inputValue]);

    useEffect(() => {
        const search = JSON.parse(localStorage.getItem('search'));
        if (search) {
            setSearchParams({ name: search });
        }
    }, [setSearchParams]);

    const { setIsLoading } = useContext(IsLoadingContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebounceFn = useCallback(
        debounce(async (value) => {
            setIsLoading(true);
            try {
                const response = await instance.get(requests.searchCharacter(value));
                const sortedCharacters = sortData(response.data.results);
                setCharacters(sortedCharacters);
                if (value.trim() === '') {
                    setSearchParams('');
                } else {
                    setSearchParams({ name: value });
                }
            } catch (e) {
                Notifier.Notify.failure('There is nothing here');
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }, 1000),
        []
    );

    const onChangeHandler = useCallback((e) => {
        const value = e.target.value.toLowerCase();
        setInputValue(value);
        handleDebounceFn(value);
    }, [handleDebounceFn]);

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
            <img className={s.searchIcon} src={searchIcon} alt={'search'} />
        </div>
    );
};
