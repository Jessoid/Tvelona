import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import '../App.css';
import Appointments from "../components/tables/Appointments"; // импорт стилей из App.css

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token);
            setName(decoded.name);
            setEmail(decoded.email);
            setPhone(decoded.phone);
            setRole(decoded.role);
        }
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                <Col style={{fontWeight: 600, fontSize: 20}}>Данные пользователя:</Col>
            </Row>
            <Row>
                <Col>Имя:</Col>
                <Col>{name}</Col>
            </Row>
            <Row>
                <Col>Эл. почта:</Col>
                <Col>{email}</Col>
            </Row>
            <Row>
                <Col>Телефон:</Col>
                <Col>{phone ? phone : "Не указан"}</Col>
            </Row>
            <Row>
                <Col>Статус:</Col>
                <Col>{role === "admin" ? "Администратор" : "Пользователь"}</Col>
            </Row>
            <Appointments/>
        </Container>
    );
}