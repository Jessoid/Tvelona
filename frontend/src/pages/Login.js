import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import axiosInstance from "../middleware/axios";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/"); //если уже авторизован, то делать тут нечего
            return;
        }
    }, []);

    const Auth = async (e) => {
        e.preventDefault();

        axiosInstance.post('/users/auth/login', {
            email: email,
            password: password,
        })
            .then(function (response) {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    navigate('/profile'); //отправляем на профиль
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
        <div className="container login-form">
            <Form onSubmit={Auth} style={{
                maxWidth: '400px',
                width: '100%',
                padding: '20px',
                backgroundColor: '#1B0F17',
                color: '#DDC5A2'
            }}>
                <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Авторизация</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Электронная почта:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Введите адрес электронной почты"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <p className="error-message">{msg}</p>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="outline-light" type="submit" style={{
                        borderColor: '#DDC5A2',
                        color: '#DDC5A2',
                        fontWeight: 600,
                        fontSize: '20px',
                        padding: '10px 20px',
                        marginTop: '10px'
                    }}>
                        Войти
                    </Button>
                </div>
            </Form>
        </div>
    );
}