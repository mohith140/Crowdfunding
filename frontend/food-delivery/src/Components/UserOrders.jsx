import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Row, Col, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import './CSS/UserOrders.css';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';  // Import uuid library for generating unique order IDs

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://foodapp-0rh9.onrender.com/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle className="text-success" />;
            case 'pending':
                return <FaClock className="text-warning" />;
            case 'cancelled':
                return <FaTimesCircle className="text-danger" />;
            case 'accepted':
                return <FaCheckCircle className="text-primary" />;
            default:
                return <FaClock className="text-warning" />;
        }
    };

    const handleReorder = async (order) => {
        const orderId = uuidv4();  // Generate a unique order ID using uuid
        const date = new Date();  // Ensure date is in ISO string format
        try {
            const response = await fetch('https://foodapp-0rh9.onrender.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    items: order.items,
                    totalPrice: order.totalPrice,
                    orderDate: date,
                    restaurantId: order.restaurantId,
                    userId: user
                }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Order placed successfully!' });
                fetchOrders(); // Refresh orders if needed
            } else {
                setMessage({ type: 'danger', text: 'Failed to place order. Please try again.' });
            }
        } catch (error) {
            console.error('Error reordering:', error);
            setMessage({ type: 'danger', text: 'An error occurred. Please try again.' });
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await fetch(`https://foodapp-0rh9.onrender.com/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'cancelled',
                }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Order cancelled successfully!' });
                fetchOrders(); // Refresh orders to update the UI
            } else {
                setMessage({ type: 'danger', text: 'Failed to cancel order. Please try again.' });
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            setMessage({ type: 'danger', text: 'An error occurred. Please try again.' });
        }
    };

    return (
        <>
            <Navbar />
            <Row className="justify-content-center">
                <h2 className="text-center mb-4 mt-5">My Orders</h2>
            </Row>
            {message && (
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                            {message.text}
                        </Alert>
                    </Col>
                </Row>
            )}
            <Row className="justify-content-center">
                <Col xs={12} md={10}>
                    <ListGroup>
                        {orders.slice(0).reverse().map(order => (
                            <ListGroup.Item key={order.orderId} className="mb-3">
                                <Card className="order-card">
                                    <Card.Header className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5>Order #{order.orderId}</h5>
                                            <p>{new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}</p>
                                        </div>
                                        <div>{getStatusIcon(order.status)}</div>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            {order.items.map(item => (
                                                <ListGroup.Item key={item.itemId} className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h6>{item.name}</h6>
                                                        <small>Quantity: {item.quantity}</small>
                                                    </div>
                                                    <span>₹{item.price * item.quantity}</span>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <h5>Total: ₹{order.totalPrice}</h5>
                                            <Button variant="primary" onClick={() => handleReorder(order)} disabled={order.status !== 'completed'}>
                                                Reorder
                                            </Button>
                                            <Button variant="danger" onClick={() => handleCancelOrder(order.orderId)} disabled={order.status !== 'pending' && order.status !== 'accepted'}>
                                                Cancel Order
                                            </Button>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small>Status: {order.status}</small>
                                    </Card.Footer>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default UserOrders;
