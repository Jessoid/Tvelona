import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../assets/1a.jpg';
import image2 from '../assets/2a.jpg';
import image3 from '../assets/3a.jpg';
import image4 from '../assets/4a.jpg';
import image5 from '../assets/5a.jpg';
import image6 from '../assets/6a.jpg';

function CarouselComponent() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', margin: '0 auto', marginTop: '50px', marginBottom: '50px' }}>
      <Carousel style={{ width: '70%', margin: '0 auto', zIndex: '1' }}>
        <Carousel.Item>
          <img className="d-block w-100" src={image1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image4} alt="Fourth slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image5} alt="Fifth slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image6} alt="Sixth slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;