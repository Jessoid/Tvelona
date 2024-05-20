import React from 'react';
import {Row, Col} from 'react-bootstrap';

function Footer() {
    return (
        <footer>
            <div className={"container"}>
                <Row style={{marginTop: '20px'}}>
                    <Col md={6}>
                        <div>
                            <h3>Часы работы</h3>
                            <p>С понедельника по пятницу</p>
                            <p>10:00 - 21:00</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <h3>Контакты</h3>
                            <p>Instagram: <a href="https://www.instagram.com/aljona_tverskaja" target="_blank" style={{
                                color: '#DDC5A2',
                                textDecoration: 'none'
                            }}>@aljona_tverskaja</a></p>
                            <p>
                                Email:
                                <a href="mailto:aljonatverskaja@gmail.com" style={{
                                    color: '#DDC5A2',
                                    textDecoration: 'none'
                                }}>
                                    aljonatverskaja@gmail.com
                                </a>
                            </p>
                            <p>Адрес: Ida-Virumaa, Toila Vald, Kohtla-Nomme, Metskonna 2</p>
                            <p>
                                Телефон:
                                <a href="tel:+3725234543" style={{color: '#DDC5A2', textDecoration: 'none'}}>
                                    +372 5234543
                                </a>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;
