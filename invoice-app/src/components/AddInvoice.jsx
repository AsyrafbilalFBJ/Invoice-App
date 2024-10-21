import InvoiceForm from "./InvoiceForm";
import Container from 'react-bootstrap/Container';

function AddInvoice() {
    return (
        <Container>
            <h3 className='text-center fw-bold my-2'>Create Invoice</h3>
            <InvoiceForm></InvoiceForm>
        </Container>
    )
}

export default AddInvoice;