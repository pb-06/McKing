import { Form, Button, Card, Container } from 'react-bootstrap';

export default function Login() {
    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card style={{ minWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">McKing gyorséttermi rendelés</h2>

                    <Form>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder='test@gmail.com'
                            />
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder='testtest'
                            />
                        </Form.Group>
                        <Button className="w-100" type="submit">Bejelentkezés</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}