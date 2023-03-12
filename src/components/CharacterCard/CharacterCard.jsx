import React from 'react';
import s from './CharacterCard.module.css'

const CharacterCard = ({characters}) => {
    return (
        <>
            {characters.map(({id, name, image, species}) => {
                return <li className={s.cardWrapper} key={id}>
                    <a href={`/character/${id}`}>
                        <img className={s.cardImage} src={image} alt="character" style={{width: '240px'}}/>
                        <div className={s.cardHeadline}>
                            <p className={s.cardTitle}>{name}</p>
                            <p className={s.cardSubTitle}>{species}</p>
                        </div>
                    </a>
                </li>
            })
            }
        </>
    );
};

export default CharacterCard;