import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import axiosInstance from "../../middleware/axios";
import {useNavigate} from "react-router-dom";

function Users() {

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
                const response = await axiosInstance.get('/users/auth/all');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            setIsLoading(false);
        }

        fetchData();

    }, []);

    return (
        <Container className="mt-5">
            <span style={{width: '100%', fontSize: 20}}>
                Пользователи
            </span>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Эл. почта</th>
                    <th>Телефон</th>
                    <th>Роль</th>
                    <th>Дата создания</th>
                    <th>Дата обновления</th>
                </tr>
                </thead>
                <tbody>

                {isLoading &&
                    <tr>Загрузка...</tr>
                }
                {!isLoading && data &&
                    data.map((item) => {
                        return <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone ? item.phone : "-"}</td>
                            <td>{item.role}</td>
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

export default Users;
