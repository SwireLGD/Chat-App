import React, { useState, useEffect } from 'react';
import { ChatProps } from '../../types';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<ChatProps[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [lastDatetime]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const respone = await fetch(`http://146.185.154.90:8000/messages?datetime=${lastDatetime}`);
      if (respone.ok) {
        const data: ChatProps[] = await respone.json();
        if (data.length > 0) {
          setLastDatetime(data[data.length - 1].datetime);
          setMessages (prevMessages => [...prevMessages, ...data]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data: ', error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner animation="border" />
        </div>
      )}
      <ListGroup as="ul" className='m-3 mt-5'>
        {messages.map(msg => (
          <React.Fragment key={msg._id}>
            <ListGroup.Item as="li" active>
              {msg.author} - {new Date(msg.datetime).toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              {msg.message}
            </ListGroup.Item>
          </React.Fragment>
        ))}
      </ListGroup>
    </>
  );
};

export default MessageList;