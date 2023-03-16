import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import CharacterPage from "../pages/CharacterPage/CharacterPage";
import LoginPage from "../pages/LoginPage/LoginPage";

const PATH = {
    CHARACTER: '/character/:id',
    LOGIN: '/login'
}

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path={PATH.CHARACTER} element={<CharacterPage/>}/>
            <Route path={PATH.LOGIN} element={<LoginPage/>}/>
        </Routes>
    );
};

export default Routing;