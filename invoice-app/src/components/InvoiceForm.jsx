import Select from './Select'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Input from './Input';
import Textarea from './Textarea';
import Table from './Table';
import { getProducts, createInvoice } from '../utils/data';
import { useEffect, useState } from 'react';

function InvoiceForm() {
	const [products, setProducts] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [date, setDate] = useState(new Date);
	const [customer, setCustomer] = useState("");
	const [salesperson, setSalesperson] = useState("");
	const [notes, setNotes] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPayment, setPaymnet] = useState("");

  const payment_type = [
    {
      value:"cash",
      label: "Cash"
    },
    {
      value:"credit",
      label: "Credit"
    },
    {
      value:"other",
      label: "Other"
    }
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        console.log(products);

        if (products.status_code === 200 && products.data) {
            const formattedProducts = products.data.map(product => ({
              value: product.product_name,
              label: product.product_name,
            }));
            console.log(formattedProducts)
            setProducts(formattedProducts);
            setAllProducts(products)
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
  
    fetchProducts();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value)
	};

  const handleCustomerChange = (e) => {
    setCustomer(e.target.value)
	};

  const handleSalespersonChange = (e) => {
    setSalesperson(e.target.value)
	};

  const handleNotesChange = (e) => {
    setNotes(e.target.value)
	};

  const handlePaymentChange = (selectedOption) => {
    setPaymnet(selectedOption.value)
    console.log(selectedPayment)
	};

  const handleProductChange = (selectedOption) => {
    const productExists = selectedProducts.find(item => item.item === selectedOption.value);
    if (!productExists) {
        setSelectedProducts(prev => [...prev, { item: selectedOption.value, quantity: 1 }]);
    }
    console.log(selectedProducts);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
			date,
			customer,
			salesperson,
      payment_type: selectedPayment,
			notes,
      products: selectedProducts,
		};

    console.log(requestData)
    try {
      const response = await createInvoice(requestData);
      console.log('Invoice created successfully:', response);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
      <Form onSubmit={handleSubmit}>
          <Row>
              <Col>
                <Input 
                  label="Date"
                  controlId="controlDate"
                  type="date"
                  name="date"
                  onChange={handleDateChange}
                />
                <Input 
                  label="Customer Name"
                  controlId="controlCustomerName"
                  type="text"
                  placeholder="John"
                  name="customer"
                  onChange={handleCustomerChange}
                />
                <Input 
                  label="Salesperson Name"
                  controlId="controlSalespersonName"
                  type="text"
                  placeholder="Doe"
                  onChange={handleSalespersonChange}
                />
              </Col>
              <Col lg={6} sm={12}>
                <Textarea 
                  label="Notes"
                  controlId="controlNotes"
                  type="textarea"
                  rows={1}
                  onChange={handleNotesChange}
                />
                <Select
                  label="Payment Type"
                  placeholder="Select a Payment Type"
                  data={payment_type}
                  onChange={handlePaymentChange}
                />
                <Select
                  label="Products"
                  placeholder="Select a Product"
                  isSearchable
                  data={products}
                  onChange={handleProductChange}
                />
              </Col>
          </Row>
          <Row>
            <Col>
            <Table
             selectedProducts={selectedProducts}
             allProducts={allProducts} 
            >

            </Table>
            </Col>
          </Row>
          
        <Button 
          // id='nav-link'
          variant="dark" 
          type="submit"
          className='w-100 mt-3 btn w-100 rounded-5 border-5 border-white shadow-sm'
          >
          Submit
        </Button>
      </Form>
  );
}

export default InvoiceForm;