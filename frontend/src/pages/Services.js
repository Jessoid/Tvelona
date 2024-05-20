import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MassageFace from '../assets/massage_face.jpg';
import MassageBody from '../assets/massage_body.jpg';
import Depilation from '../assets/depilation.jpg';
import SkinCare from '../assets/skin_care.jpg';

function Services() {
    return (
        <Container>
            <Row>
                <Col md={6} style={{marginBottom: '30px'}}>
                    <img src={MassageFace} alt="Massage Face" style={{width: '100%'}}/>
                    <h3 style={{fontFamily: 'Cormorant SC', color: '#DDC5A2', marginTop: '20px'}}>Массаж лица</h3>
                    <p style={{fontFamily: 'Cormorant SC', color: '#DDC5A2'}}>
                        Массаж лица - это прекрасный способ расслабиться и улучшить состояние кожи. Наши специалисты
                        помогут вам достичь релаксации и красоты.
                    </p>
                </Col>
                <Col md={6} style={{marginBottom: '30px'}}>
                    <img src={MassageBody} alt="Massage Body" style={{width: '100%'}}/>
                    <h3 style={{fontFamily: 'Cormorant SC', color: '#DDC5A2', marginTop: '20px'}}>Массаж тела</h3>
                    <p style={{fontFamily: 'Cormorant SC', color: '#DDC5A2'}}>
                        Массаж тела - идеальный способ расслабиться после напряженного дня и подарить себе заряд
                        энергии. Наши мастера проведут для вас массаж по всем правилам и техникам.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={6} style={{marginBottom: '30px'}}>
                    <img src={Depilation} alt="Depilation" style={{width: '100%'}}/>
                    <h3 style={{fontFamily: 'Cormorant SC', color: '#DDC5A2', marginTop: '20px'}}>Депиляция</h3>
                    <p style={{fontFamily: 'Cormorant SC', color: '#DDC5A2'}}>
                        Депиляция - это эффективный способ избавиться от нежелательных волос на теле. Наши профессионалы
                        помогут вам получить гладкую и ухоженную кожу.
                    </p>
                </Col>
                <Col md={6} style={{marginBottom: '30px'}}>
                    <img src={SkinCare} alt="Skin Care" style={{width: '100%'}}/>
                    <h3 style={{fontFamily: 'Cormorant SC', color: '#DDC5A2', marginTop: '20px'}}>Уходовые
                                                                                                  процедуры</h3>
                    <p style={{fontFamily: 'Cormorant SC', color: '#DDC5A2'}}>
                        Уходовые процедуры - это специальные процедуры для улучшения состояния кожи лица. Мы предлагаем
                        широкий выбор масок и уходов, чтобы ваша кожа всегда оставалась красивой и здоровой.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Services;