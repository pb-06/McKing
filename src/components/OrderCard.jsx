import React from 'react';
import { Card, Button, ListGroup, CloseButton } from 'react-bootstrap';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const itemTranslations = {
    hamburger: 'hamburger',
    sult_krumpli: 'sült krumpli',
    kola: 'kóla'
};

export default function OrderCard({ order, orderNumber }) {
    const isNew = order.status === 'new';

    // Rendelés állapotának váltása
    const handleToggleStatus = async () => {
        const orderDocRef = doc(db, 'orders', order.id);
        try {
            const newStatus = isNew ? 'completed' : 'new';
            await updateDoc(orderDocRef, {
                status: newStatus
            });
        } catch (error) {
            console.error("Hiba az állapot frissítésekor: ", error);
        }
    };

    // Rendelés törlése
    const handleDeleteOrder = async () => {
        if (window.confirm(`Biztosan törölni szeretnéd a(z) ${orderNumber}. rendelést?`)) {
            const orderDocRef = doc(db, 'orders', order.id);
            try {
                await deleteDoc(orderDocRef);
            } catch (error) {
                console.error("Hiba a rendelés törlésekor: ", error);
            }
        }
    };

    return (
        <Card className={`mb-3 ${isNew ? 'border-success' : 'border-danger'}`}>
            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                {orderNumber}. rendelés
                <CloseButton onClick={handleDeleteOrder} title="Rendelés törlése" />
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {Object.entries(order.items).map(([itemId, quantity]) => (
                        <ListGroup.Item key={itemId} className="border-0 px-0">
                            <span className="fw-bold">{quantity}x</span> {itemTranslations[itemId] || itemId}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button
                    variant={isNew ? "outline-danger" : "success"}
                    className="w-100 mt-3"
                    onClick={handleToggleStatus}
                >
                    {isNew ? 'Készítés jelölése' : 'Elkészült'}
                </Button>
            </Card.Body>
        </Card>
    );
}