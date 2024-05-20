import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';
import axiosInstance from "../middleware/axios";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({rating: 1, comment: ''});
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const response = await axiosInstance.get('/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);

            axiosInstance.post('/reviews/create', {
                ...newReview,
                user_id: decodedToken.id
            })
                .then(function (response) {
                    setMsg(response.data.msg);

                    setNewReview({rating: 1, comment: ''});
                    getReviews();
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
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <Container>
            <h2 style={{marginTop: '40px', marginBottom: '20px'}}>Отзывы</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {reviews.map((review) => (
                    <Col key={review.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Рейтинг: {review.rating}</Card.Title>
                                <Card.Text>{review.comment}</Card.Text>
                                <Card.Footer>{review.user.name}</Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {localStorage.getItem("token") &&
                <>
                    <h3 style={{marginTop: '40px', marginBottom: '20px'}}>Оставить отзыв</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Рейтинг</Form.Label>
                            <Form.Control
                                as="select"
                                name="rating"
                                value={newReview.rating}
                                onChange={handleInputChange}
                            >
                                {[...Array(6).keys()].slice(1).map((rating) => (
                                    <option key={rating} value={rating}>{rating}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Комментарий</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="comment"
                                value={newReview.comment}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <p className="error-message">{msg}</p>
                        <div className="send">
                        <Button variant="outline-light" type="submit" style={{
                            borderColor: '#DDC5A2',
                            color: '#DDC5A2',
                            fontWeight: 600,
                            fontSize: '20px',
                            padding: '10px 20px',
                            marginTop: '10px'
                        }}>
                            отправить
                        </Button>
                        </div>
                    </Form>
                </>
            }
        </Container>
    );
}

export default Reviews;