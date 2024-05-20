import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Reviews from '../pages/Reviews';
import About from '../pages/About';
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Dashboard from "../pages/Dashboard";

export default function Content() {
    return (
        <main>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/services" element={<Services/>}/>
                <Route exact path="/reviews" element={<Reviews/>}/>
                <Route exact path="/about" element={<About/>}/>
                <Route exact path="/contact" element={<Contact/>}/>

                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/dashboard" element={<Dashboard/>}/>

                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
            </Routes>
        </main>
    );
}