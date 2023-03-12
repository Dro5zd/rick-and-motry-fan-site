import React from 'react';
import s from './CharacterInfoCard.module.css'

const CharacterInfoCard = ({character}) => {
    const {name, species, image, origin, type, status, gender} = character
    return (
            <div className={s.cardWrapper}>
                <img className={s.cardImage} src={image} alt="character"/>
                <h3 className={s.cardTitle}>{name}</h3>
                <p className={s.listTitle}>Informations</p>
                <ul>
                    <li className={s.listItem}>
                        <p className={s.listItemTitle}>Gender</p>
                        <p className={s.listItemSubTitle}>{gender}</p>
                    </li>
                    <li className={s.listItem}>
                        <p className={s.listItemTitle}>Status</p>
                        <p className={s.listItemSubTitle}>{status}</p>
                    </li>
                    <li className={s.listItem}>
                        <p className={s.listItemTitle}>Specie</p>
                        <p className={s.listItemSubTitle}>{species}</p>
                    </li>
                    <li className={s.listItem}>
                        <p className={s.listItemTitle}>Origin</p>
                        <p className={s.listItemSubTitle}>{origin && origin.name}</p>
                    </li>
                    <li className={s.listItem}>
                        <p className={s.listItemTitle}>Type</p>
                        <p className={s.listItemSubTitle}>{type !== '' ? type : 'Unknown'}</p>
                    </li>
                </ul>
            </div>
    );
};

export default CharacterInfoCard;