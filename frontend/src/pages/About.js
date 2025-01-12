import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import photo1 from '../assets/1a.jpg'; // Путь к изображению

function About() {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Image src={photo1} alt="Моя фотография" fluid />
                </Col>
                <Col md={6}>
                    <p>Здравствуйте, меня зовут Алена. Я специалист по массажу и легким косметологическим процедурам, таким как массаж лица и нанесение масок. Моя цель - помочь вам достичь красоты и гармонии тела и души.</p>
                    <p>Я создала свой салон, чтобы предложить вам уникальный опыт ухода за кожей и релаксации. В моей работе я использую только лучшие техники и натуральные продукты, чтобы вы почувствовали себя освеженными, расслабленными и красивыми.</p>
                    <p>Буду рада встретить вас в моем салоне и подарить вам незабываемое впечатление. Доверьтесь моему опыту и заботе, и вы уйдете от меня с улучшенным настроением и уверенностью в себе.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
