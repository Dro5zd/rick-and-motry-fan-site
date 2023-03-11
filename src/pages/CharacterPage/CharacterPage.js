import React, {useContext, useEffect, useState} from 'react';
import instance from "../../api/axios";
import requests from "../../api/requests";
import {Link, useLocation, useParams} from "react-router-dom";
import {IsLoadingContext} from "../../App";

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

    const {name, specie, image, origin, type, status, gender} = character

    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/";

    return (
        <>
            <Link to={backLinkHref}>GO BACK</Link>
            {character && <div>
                <img src={image} alt="character" style={{width: '240px'}}/>
                <p>{name}</p>
                Information
                <p>{gender}</p>
                <p>{status}</p>
                <p>{specie}</p>
                Origin: <p>{origin ? origin.name : 'No info'}</p>
                Type: <p>{type !== '' ? type : 'Unknown'}</p>
            </div>}
        </>
    );
};

export default CharacterPage;