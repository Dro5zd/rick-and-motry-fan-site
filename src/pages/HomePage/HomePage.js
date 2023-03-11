import React, {useContext, useEffect, useState} from 'react';
import {IsLoadingContext} from "../../App";
import instance from "../../api/axios";
import requests from "../../api/requests";
import {Link} from "react-router-dom";
import logo from '../../assets/main-logo.png'
import {SearchForm} from "../../components/SearchForm/SearchForm";

const HomePage = () => {

    const {setIsLoading} = useContext(IsLoadingContext);
    const [characters, setCharacters] = useState([]);

    // const nextPageHandler = async () => {
    //     try {
    //         const res = await instance.get(requests.fetchCharacters);
    //         const resNew = res.data.info.next
    //         console.log(resNew)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    useEffect(() => {
            setIsLoading(true);

            async function fetchData() {
                try {
                    const response = await instance.get(requests.fetchCharacters);
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
        <div>
            <img src={logo} alt="" style={{width: '240px'}}/>
            {/*<button onClick={nextPageHandler}>Page+1</button>*/}
            <SearchForm placeholder={'Filter by name...'} setCharacters={setCharacters}/>
            {characters.map(({id, name, image, species}) => {
                    return <Link to={`/character/${id}`} key={id}>
                        <div>
                            <img src={image} alt="character" style={{width: '240px'}}/>
                            <p>{name}</p>
                            <p>{species}</p>
                        </div>
                    </Link>
                }
            )
            }

        </div>
    );
};

export default HomePage;