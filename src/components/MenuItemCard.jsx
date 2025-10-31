import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function MenuItemCard({ item, quantity, onIncrement, onDecrement }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <Card.Title>{item.name}</Card.Title>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button variant="danger" onClick={() => onDecrement(item.id)}>-</Button>
            <strong className="mx-3">
              {quantity}
            </strong>
            <Button variant="success" onClick={() => onIncrement(item.id)}>+</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}