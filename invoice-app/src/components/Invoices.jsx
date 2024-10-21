import InvoiceCard from "./InvoiceCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { getInvoices } from '../utils/data';
import { useEffect, useState } from "react";
import Pagin from "./Pagin";

function Invoices() {
	const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [dataPerPage, setDataPerPage] = useState(0);

    useEffect(() => {
        const fetchInvoices = async (pageNumber) => {
          try {
            const invoices = await getInvoices(pageNumber);
            console.log(invoices);

            if (invoices.status_code === 200 && invoices.data) {
                const data = invoices.data;
                const pagination = invoices.pagination;
                setInvoices(data);
                setCurrentPage(pagination.current_page);
                setTotalPages(pagination.total_pages);
                setDataPerPage(pagination.data_perpage);
            }
          } catch (error) {
            console.error('Error fetching invoices:', error);
          }
        };
      
        fetchInvoices(currentPage);
      }, [currentPage]);

      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      
      
    return (
        <Container>
            <h3 className='text-center fw-bold my-2'>Invoices</h3>
            {invoices.length > 0 ? (
                <Row className="row-gap-4">
                    {invoices.map((invoice) => (
                        <Col lg={4}>
                            <InvoiceCard 
                                key={invoice.invoice_no}
                                id={invoice.invoice_no}
                                {...invoice}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className=''>There is no Invoices</p>
            )}
            
            <Pagin 
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </Container>
    )
}

export default Invoices;