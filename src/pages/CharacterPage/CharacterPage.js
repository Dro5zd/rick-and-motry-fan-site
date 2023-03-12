import React, {useContext, useEffect, useState} from 'react';
import instance from "../../api/axios";
import requests from "../../api/requests";
import {useParams} from "react-router-dom";
import {IsLoadingContext} from "../../App";
import CharacterInfoCard from "../../components/CharacterInfoCard/CharacterInfoCard";
import s from './CharacterPage.module.css'
import BackButton from "../../components/BackButton/BackButton";
const CharacterPage = () => {

    const {id} = useParams();
    const {setIsLoading} = useContext(IsLoadingContext);
    const [character, setCharacter] = useState({});

    useEffect(() => {
            setIsLoading(true);

            async function fetchCharacter() {
                try {
                    const request = await instance.get(requests.fetchCharacterDetails(id));
                    setCharacter(request.data)
                } catch (e) {
                    console.log(e)
                } finally {
                    setIsLoading(false);
                }
            }
            fetchCharacter();
        }, [id, setIsLoading]
    );

    return (
        <div className={s.container} >
            <BackButton/>
            {character && <CharacterInfoCard character={character}/>}
        </div>
    );
};

export default CharacterPage;