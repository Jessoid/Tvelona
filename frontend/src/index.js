import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axiosInstance from "./middleware/axios";

// Добавляем ссылки на Google Fonts в заголовок документа
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300;400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

axiosInstance.defaults.withCredentials = true;

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();