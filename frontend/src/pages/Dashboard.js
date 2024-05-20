import React, {useState, useEffect} from 'react';
import {Container, Table} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../App.css';
import Appointments from "../components/tables/Appointments";
import Users from "../components/tables/Users";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <>
            <Appointments isAdmin={true}/>
            <Users/>
        </>
    );
}