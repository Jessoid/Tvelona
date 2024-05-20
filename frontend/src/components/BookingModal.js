import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import axiosInstance from "../middleware/axios";
import {jwtDecode} from "jwt-decode";

function BookingModal({show, handleClose}) {
    const getMinDate = () => {
        const now = new Date();
        now.setHours(now.getHours() + 3); // Добавляем 3 часа к текущему времени
        return now;
    };

    const minTime = new Date();
    minTime.setHours(10, 0, 0); // Устанавливаем минимальное время 10:00

    const maxTime = new Date();
    maxTime.setHours(21, 0, 0); // Устанавливаем максимальное время 21:00

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        procedure: '',
        date: getMinDate(),
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleDateChange = (date) => {
        setFormData({...formData, date: date});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            formData.userId = decodedToken.id;
        }

        axiosInstance.post('/appointments/book', formData)
            .then(function (response) {
                alert(response.data.msg);
                handleClose();
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
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{
                backgroundColor: '#301B28',
                color: '#DDC5A2',
                borderBottom: '2px solid #DDC5A2'
            }}>
                <Modal.Title style={{color: '#DDC5A2'}}>Записаться на процедуру</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#1B0F17', color: '#DDC5A2', padding: '20px'}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName">
                        <Form.Label style={{color: '#DDC5A2'}}>Имя</Form.Label>
                        <Form.Control type="text" placeholder="Введите ваше имя" name="firstName" value={formData.firstName} onChange={handleChange} required className="custom-form-control"/>
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label style={{color: '#DDC5A2'}}>Фамилия</Form.Label>
                        <Form.Control type="text" placeholder="Введите вашу фамилию" name="lastName" value={formData.lastName} onChange={handleChange} required className="custom-form-control"/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label style={{color: '#DDC5A2'}}>Электронная почта</Form.Label>
                        <Form.Control type="email" placeholder="Введите вашу эл. почту" name="email" value={formData.email} onChange={handleChange} required className="custom-form-control"/>
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label style={{color: '#DDC5A2'}}>Телефон</Form.Label>
                        <Form.Control type="text" placeholder="Введите ваш номер телефона" name="phone" value={formData.phone} onChange={handleChange} required className="custom-form-control"/>
                    </Form.Group>
                    <Form.Group controlId="formProcedure">
                        <Form.Label style={{color: '#DDC5A2'}}>Процедура</Form.Label>
                        <Form.Control as="select" name="procedure" value={formData.procedure} onChange={handleChange} className="custom-form-control">
                            <option value="">Выберите процедуру</option>
                            <option value="Массаж лица">Массаж лица</option>
                            <option value="Массаж тела">Массаж тела</option>
                            <option value="Пилинг">Пилинг</option>
                            <option value="Чистка">Чистка</option>
                            <option value="Уходовые процедуры">Уходовые процедуры</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label style={{color: '#DDC5A2'}}>Дата</Form.Label>
                        <br/>
                        <DatePicker
                            id="date" // Добавляем id для DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            minDate={getMinDate()} // Ограничение выбора даты только на будущие даты
                            minTime={minTime}
                            maxTime={maxTime}
                            showTimeSelect
                            timeIntervals={90} // Промежуток времени в минутах (1.5 часа)
                            dateFormat="dd.MM.yyyy HH:mm"
                            className="form-control custom-datepicker" // Добавляем класс для DatePicker
                        />
                    </Form.Group>
                    <p className="error-message" style={{marginTop: '20px'}}>{msg}</p>
                    <Button variant="outline-light" type="submit" style={{width: '100%'}} className="custom-button">
                        Записаться
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default BookingModal;