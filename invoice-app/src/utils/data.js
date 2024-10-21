
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

const getInvoices = (pageNumber) => fetchData(`/invoices?page=${pageNumber}`);

const getInvoiceById = (id) => fetchData(`/invoices/${id}`);

const getProducts = () => fetchData('/products');

const getProductsSoldByNo = (id) => fetchData(`/products-sold/${id}`);

const createInvoice = (invoiceData) => postData('/invoice', invoiceData);

const getInvoicesReports = (graphType) => fetchData(`/invoices/reports/${graphType}`);

const checkEndpoint = () => fetchData('/');

export {
  getInvoices,
  getInvoiceById,
  getProducts,
  getProductsSoldByNo,
  createInvoice,
  getInvoicesReports,
  checkEndpoint,
};