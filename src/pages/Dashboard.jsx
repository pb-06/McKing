import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import OrderCard from '../components/OrderCard';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    // Bármikor, ha változás történik a lekérdezés eredményében, ez a funkció lefut. (onSnapshot listener)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
      setLoading(false);
    }, (err) => {
      console.error("Hiba a rendelések lekérésekor:", err);
      setError("Nem sikerült betölteni a rendeléseket.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Rendelések betöltése...</p>
      </Container>
    );
  }

  if (error) {
    return <Container><Alert variant="danger">{error}</Alert></Container>;
  }

  // Szétválasztjuk az új és a teljesített rendeléseket
  const newOrders = orders.filter(order => order.status === 'new');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={6}>
          <h3>Új rendelések ({newOrders.length})</h3>

          {newOrders.length > 0 ? (
            <div className="d-flex flex-wrap gap-3">
              {newOrders.map((order, index) => (
                <OrderCard key={order.id} order={order} orderNumber={newOrders.length - index} />
              ))}
            </div>
          ) : (
            <p>Nincsenek új rendelések.</p>
          )}
        </Col>

        <Col md={6}>
          <h3>Elkészült rendelések ({completedOrders.length})</h3>
          {completedOrders.length > 0 ? (
            <div className="d-flex flex-wrap gap-3">
              {completedOrders.map((order, index) => (
                <OrderCard key={order.id} order={order} orderNumber={completedOrders.length - index} />
              ))}
            </div>
          ) : (
            <p>Nincsenek elkészült rendelések.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}