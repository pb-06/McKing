import { Container, Button, Card, Button, Row, Col } from 'react-bootstrap';
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
    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Új rendelés leadása</h2>

            {menuItems.map(item => (
                <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={order[item.id]}
                />
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