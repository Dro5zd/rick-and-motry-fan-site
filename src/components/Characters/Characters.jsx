import React from 'react';
import s from './Characters.module.css'
import CharacterCard from "../CharacterCard/CharacterCard";

const Characters = ({characters}) => {
    return (
        <ul className={s.charactersContainer}>
            <CharacterCard characters={characters}/>
        </ul>
    );
};

export default Characters;