import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeIndex from '../containers/home';
import AnimeIndex from '../containers/anime';
import AnimeDetailIndex from '../containers/anime_detail';


const AppRouter = () => {
    return (
        <Routes>
            <Route element={<HomeIndex/>} path="/"/>
            <Route element={<AnimeIndex/>} path="/anime"/>
            <Route element={<AnimeDetailIndex/>} path="/anime/:id"/>
        </Routes>
    );
}

export default AppRouter;