import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

interface Props {
  onSend: () => void;
};

const MessageSendHandler: React.FC<Props> = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');

  const sendMessage = async () => {
    const data = new URLSearchParams();
    const url = 'http://146.185.154.90:8000/messages';
    data.set('message', newMessage);
    data.set('author', nickname);
    
    try {
      const response = await fetch(url, {
        method: 'post',
        body: data,
      });

      if (response.ok) {
        setNewMessage('');
        onSend();
      };

    } catch (error) {
      console.error('Error: ', error);
    };
  };

  return (
    <Form>
      <Form.Group className="m-3">
        <Form.Label>Nickname</Form.Label>
        <Form.Control value={nickname} type="text" placeholder="Enter your name" onChange={(e) => setNickname(e.target.value)} />
      </Form.Group>
      <Form.Group className="m-3">
        <Form.Label>Message textarea</Form.Label>
        <Form.Control value={newMessage} as="textarea" rows={3} placeholder='Write something' onChange={(e) => setNewMessage(e.target.value)} />
        <Button variant="primary" type='submit' className='mt-3' onClick={sendMessage}>Send</Button>{' '}
      </Form.Group>
    </Form>
  );
};

export default MessageSendHandler;