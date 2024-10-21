import { Card, Col, Row } from "react-bootstrap";

function InvoiceCard({id, customer, salesperson, payment_type, notes, total_cogs, total_price}) {
    return ( 
        <Card className="border border-5 rounded-5 border-white bg-light table-responsive p-2 shadow-sm">
            <Card.Body>
              <Card.Title><strong>Invoice #{id}</strong></Card.Title>
              
                <Row >
                  <Col className="fw-bold">Customer</Col>
                  <Col className="text-start">{customer}</Col>
                </Row>
                <Row >
                  <Col className="fw-bold">Salesperson</Col>
                  <Col className="text-start">{salesperson}</Col>
                </Row>
                <Row >
                  <Col className="fw-bold">Payment Type</Col>
                  <Col className="text-start">{payment_type}</Col>
                </Row>
                <Row >
                  <Col>
                  <div className="fw-bold">Notes</div>
                  <div className="text-start">{notes}</div>
                  </Col>
                </Row>
                <div className="mt-2">
                  <Row className="fw-bold">
                    <Col>Total COGS</Col>
                    <Col className="text-end">{total_cogs}</Col>
                  </Row>
                  <Row className="fw-bold">
                    <Col>Total Price</Col>
                    <Col className="text-end">{total_price}</Col>
                  </Row>
                </div>
            </Card.Body>
        </Card>
     );
}

export default InvoiceCard;