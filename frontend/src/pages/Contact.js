import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Contact() {
    const linkStyle = {
        textDecoration: 'none', // убираем подчеркивание
        color: 'inherit' // используем цвет по умолчанию
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Контакты</h2>
                    <p>Instagram: <a href="https://www.instagram.com/aljona_tverskaja" target="_blank" rel="noopener noreferrer" style={linkStyle}>@aljona_tverskaja</a></p>
                    <p>Email: <a href="mailto:aljonatverskaja@gmail.com" style={linkStyle}>aljonatverskaja@gmail.com</a></p>
                    <p>Адрес: Ida-Virumaa, Toila Vald, Kohtla-Nomme, Metskonna 2</p>
                    <p>Телефон: <a href="tel:+3725234543" style={linkStyle}>+372 5234543</a></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;