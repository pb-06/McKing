import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Sikertelen bejelentkezés. Ellenőrizd az email címet és a jelszót.');
            console.error("Firebase login error:", err);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card style={{ minWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">McKing gyorséttermi rendelés</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder='test@gmail.com'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder='testtest'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="w-100" type="submit">Bejelentkezés</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}