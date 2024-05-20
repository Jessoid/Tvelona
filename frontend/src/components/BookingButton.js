import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BookingModal from './BookingModal';

function BookingButton() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div style={{ textAlign: 'center', marginBottom: '50px', border: '2px solid #DDC5A2', padding: '20px', borderRadius: '10px' }}>
      <h2 style={{ fontFamily: 'Cormorant SC', color: '#DDC5A2', marginBottom: '20px' }}>О красоте и здоровье</h2>
      <p style={{ fontFamily: 'Cormorant SC', color: '#DDC5A2', fontSize: '18px', marginBottom: '20px' }}>Наслаждайтесь уникальным опытом красоты и здоровья в нашем салоне.</p>
      <Button variant="outline-light" style={{ fontFamily: 'Cormorant SC', color: '#DDC5A2', borderColor: '#DDC5A2', marginTop: '20px' }} onClick={handleShowModal}>
        Записаться на процедуру
      </Button>
      <BookingModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default BookingButton;