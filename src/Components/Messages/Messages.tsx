import ListGroup from 'react-bootstrap/ListGroup';

function Message() {
  return (
    <ListGroup as="ul" className='m-3 mt-5'>
      <ListGroup.Item as="li" active>
        Some Author + Date
      </ListGroup.Item>
      <ListGroup.Item as="li">Some msg</ListGroup.Item>
    </ListGroup>
  );
}

export default Message;