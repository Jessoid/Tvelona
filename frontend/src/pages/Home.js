import React from 'react';
import { Container } from 'react-bootstrap';
import Carousel from '../components/Carousel';
import BookingButton from '../components/BookingButton';
import Services from '../pages/Services';
import '../App.css';

export default function Home() {
    return(
        <div>
            <Container className="main-content">
                <Carousel />
                <BookingButton />
                <Services />
            </Container>
        </div>
    )
}