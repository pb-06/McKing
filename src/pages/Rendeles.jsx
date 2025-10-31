import { Container, Button, Card, Button, Row, Col } from 'react-bootstrap';

// menü elemei
const menuItems = [
    { id: 'hamburger', name: 'Hamburger' },
    { id: 'sult_krumpli', name: 'Sült Krumpli' },
    { id: 'kola', name: 'Kóla' },
];

// state
const defaultOrderState = {
    hamburger: 0,
    sult_krumpli: 0,
    kola: 0,
};

export default function Rendeles() {
    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Új rendelés leadása</h2>

            {menuItems.map(item => (
                <Card className="mb-3">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col>
                                <Card.Title>{item.name}</Card.Title>
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center">
                                <Button variant="danger">-</Button>
                                <strong className="mx-3">
                                    {quantity}
                                </strong>
                                <Button variant="success">+</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}

            <div className="d-grid mt-4">
                <Button
                    variant="primary"
                    size="lg"
                >
                    Megrendelés
                </Button>
            </div>
        </Container>
    );
}