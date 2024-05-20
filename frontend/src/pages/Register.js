import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Form, Button} from 'react-bootstrap';
import axiosInstance from "../middleware/axios";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/"); //если уже авторизован, то делать тут нечего
            return;
        }
    }, []);

    const RegisterSubmit = async (e) => {
        e.preventDefault();

        axiosInstance.post('/users/auth/register', {
            name: name,
            email: email,
            phone: phone,
            password: password,
            confPassword: confPassword
        })
            .then(function (response) {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/"); //отправляем на главную
                    window.location.reload(); //перезагружаем страницу и там уже само авторизируется по токену
                } else {
                    setMsg('Неизвестная ошибка');
                }
            })
            .catch(function (error) {
                if (error.response && error.response.data && error.response.data[0] && error.response.data[0].msg) {
                    setMsg(error.response.data[0].msg); //отображаем только первую ошибку из массива ошибок
                } else if (error.response && error.response.data && error.response.data && error.response.data.msg) {
                    setMsg(error.response.data.msg); //если не массив, то отображаем конкретную ошибку
                } else {
                    setMsg('Неизвестная ошибка');
                }
            })
            .finally(function () {
            });
    };

    return (
        <Container className="px-5" style={{width: '50%'}}>
            <h2>Форма регистрации</h2>
            <Form onSubmit={RegisterSubmit}>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Имя:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Ваше имя'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Электронная почта:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder='Ваша электронная почта'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Телефон:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Ваш номер телефона'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder='••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">
                    <Form.Label>Подтвердите пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder='••••••'
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                </Form.Group>
                <p className="error-message">{msg}</p>
                <div className="d-grid gap-2">
                    <Button type="submit" className="btn btn-custom" style={{fontWeight: 600, fontSize: '20px'}}>
                        Регистрация
                    </Button>
                </div>
            </Form>
        </Container>
    )
}