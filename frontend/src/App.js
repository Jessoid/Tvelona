import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Mobile.css';
import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;