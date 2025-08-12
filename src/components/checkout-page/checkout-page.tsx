import "./checkout-page.css"
import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Accordion,
  Form,
} from 'react-bootstrap';

const CheckoutPage = ({ cart }) => {
  const [selectedPayment, setSelectedPayment] = useState('Tarjeta de crédito');

  const cartItems = Object.values(cart || {});
  const isEmpty = cartItems.length === 0;

  const getItemSubtotal = (item) => {
    const price = item.price;
    const quantity = item.quantity || 1;
    return price * quantity;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + getItemSubtotal(item), 0);
  };

  if (isEmpty) {
    return (
      <Container className="my-5 text-center">
        <Card className="p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <Card.Body>
            <h4 className="mb-3">Tu carrito está vacío</h4>
            <p>Agrega productos para continuar con el checkout.</p>
            <Button variant="dark" href="/productos">Volver a comprar</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Verifica tu Pedido</h2>
      <Row>
        {/* Cart items */}
        <Col md={8}>
          {cartItems.map((item) => (
            <Card className="mb-3" key={item.id}>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col md={9}>
                    <h5>{item.name}</h5>
                    <p className="mb-1"><strong>Marca:</strong> {item.brand}</p>
                    {item.attributes?.selectedSize && (
                      <p className="mb-1"><strong>Tamaño:</strong> {item.attributes?.selectedSize}</p>
                    )}
                    <p className="mb-1"><strong>Cantidad:</strong> {item.quantity}</p>
                    <p className="mb-0"><strong>Precio unitario:</strong> ${item.price}</p>
                    <p className="mb-0"><strong>Subtotal:</strong> ${getItemSubtotal(item)}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          {/* Payment options */}
          <Card className="mt-4">
            <Card.Header>
              <h5>Método de pago</h5>
            </Card.Header>
            <Card.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Tarjeta de crédito o débito</Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      label="Pagar con tarjeta"
                      checked={selectedPayment === 'Tarjeta de crédito'}
                      onChange={() => setSelectedPayment('Tarjeta de crédito')}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>PayPal</Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      label="Pagar con PayPal"
                      checked={selectedPayment === 'PayPal'}
                      onChange={() => setSelectedPayment('PayPal')}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Pago en OXXO</Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      id="oxxo"
                      name="paymentMethod"
                      label="Pagar en efectivo en OXXO"
                      checked={selectedPayment === 'OXXO'}
                      onChange={() => setSelectedPayment('OXXO')}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>

        {/* Summary */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Resumen de compra</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  {item.name} {item.attributes?.selectedSize} x{item.quantity} — ${getItemSubtotal(item)}
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <strong>Total: ${getCartTotal()}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Método de pago:</strong><br />
                {selectedPayment}
              </ListGroup.Item>
            </ListGroup>
            <Card.Footer>
              <Button variant="dark" className="w-100">
                Proceder al pago
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
