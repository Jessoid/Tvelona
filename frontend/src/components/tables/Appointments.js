import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import axiosInstance from "../../middleware/axios";
import {useNavigate} from "react-router-dom";

function Appointments({isAdmin = false}) {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/"); //если не авторизован, то делать тут нечего
            return;
        }

        async function fetchData() {
            try {
                const response = await axiosInstance.get(isAdmin ? '/appointments/admin-all' : '/appointments/all');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
            setIsLoading(false);
        }

        fetchData();

    }, []);

    return (
        <Container className="mt-5">
            <span style={{width: '100%', fontSize: 20}}>
                {isAdmin ? <>Записи</> : <>Мои записи</>}
            </span>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    {isAdmin &&
                        <>
                            <th>ID</th>
                            <th>ID пользователя</th>
                        </>
                    }
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Эл. почта</th>
                    <th>Телефон</th>
                    <th>Процедура</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Дата обновления</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading && data.length === 0 &&
                    <>Записей нет.</>
                }
                {isLoading &&
                    <>Загрузка...</>
                }
                {!isLoading && data &&
                    data.map((item) => {
                        return <tr>
                            {isAdmin &&
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.user_id ? item.user_id : "-"}</td>
                                </>
                            }
                            <td>{item.name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.procedure}</td>
                            <td>{item.date}</td>
                            <td>{item.status}</td>
                            <td>{item.date_created}</td>
                            <td>{item.date_updated ? item.date_updated : "-"}</td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
}

export default Appointments;
