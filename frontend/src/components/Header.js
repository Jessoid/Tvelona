import React, {useState, useEffect} from 'react';
import logo from '../assets/logo20242.png';
import {useNavigate} from "react-router-dom";
import axiosInstance from "../middleware/axios";

export default function Header() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await axiosInstance.get('/users/auth/me');
            if (response.data) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const onClickLogout = () => {
        if (window.confirm('Вы уверены, что хотите выйти?')) {
            window.localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        }
    };

    return (
        <>
            <header>
                <div className={"container"}>
                    <img src={logo} onClick={() => navigate("/")} alt="Логотип"/>

                    <div className={"menu"}>
                        <div onClick={() => navigate("/")}>Главная</div>
                        <div onClick={() => navigate("/services")}>Услуги</div>
                        <div onClick={() => navigate("/reviews")}>Отзывы</div>
                        <div onClick={() => navigate("/about")}>О нас</div>
                        <div onClick={() => navigate("/contact")}>Контакты</div>

                        {user ?
                            <>
                                {user.role === "admin" &&
                                    <div onClick={() => navigate("/dashboard")}>Админ-панель</div>
                                }
                                <div onClick={() => navigate("/profile")}>Профиль</div>
                                <div onClick={onClickLogout}>Выйти</div>
                            </>
                            :
                            <>
                                <div onClick={() => navigate("/login")}>Войти</div>
                                <div onClick={() => navigate("/register")}>Зарегистрироваться</div>
                            </>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}
      
        