import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import CharacterPage from "../pages/CharacterPage/CharacterPage";

const PATH = {
    CHARACTER: '/character/:id'
}

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path={PATH.CHARACTER} element={<CharacterPage/>}/>
        </Routes>
    );
};

export default Routing;