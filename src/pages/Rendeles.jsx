import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import MenuItemCard from '../components/MenuItemCard';

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
    const [order, setOrder] = useState(defaultOrderState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleIncrement = (itemId) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [itemId]: prevOrder[itemId] + 1,
        }));
    };

    const handleDecrement = (itemId) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [itemId]: Math.max(0, prevOrder[itemId] - 1),
        }));
    };

    const handleSubmitOrder = async () => {
        setMessage('');

        // Csak azok az elemek kerülnek a rendelésbe, amelyekből legalább egy darab van
        const itemsToOrder = Object.entries(order)
            .filter(([key, value]) => value > 0)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        if (Object.keys(itemsToOrder).length === 0) {
            setMessage('A rendelés leadásához legalább egy terméket válasszon!');
            return;
        }

        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                items: itemsToOrder,
                createdAt: serverTimestamp(),
                status: 'new',
            });

            console.log("A rendelés sikeresen elmentve, ID: ", docRef.id);
            setMessage('A rendelésedet sikeresen fogadtuk!');
            setOrder(defaultOrderState); // Kosár kiürítése
        } catch (e) {
            console.error("Hiba a rendelés mentésekor: ", e);
            setMessage('Hiba történt a rendelés leadásakor. Kérjük, próbálja újra.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Új rendelés leadása</h2>

            {menuItems.map(item => (
                <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={order[item.id]}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
            ))}

            {message && <Alert variant={message.includes('Hiba') ? 'danger' : 'success'}>{message}</Alert>}

            <div className="d-grid mt-4">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmitOrder}
                    disabled={loading}
                >
                    {loading ? 'Folyamatban...' : 'Megrendelés'}
                </Button>
            </div>
        </Container>
    );
}