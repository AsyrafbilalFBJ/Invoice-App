import { Table } from 'react-bootstrap';

function TableProducts({ selectedProducts, allProducts }) {
    const getProductDetails = (productName) => {
        return allProducts.data.find(product => product.product_name === productName);
    };

  return (
    <div className='card border border-5 rounded-5 border-white bg-light table-responsive p-2 shadow-sm'>
      <Table hover variant="light" className='table-borderless m-0'>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Product Picture</th>
            <th>Stock</th>
            <th>COGS</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
        {selectedProducts.map((selectedProduct, index) => {
          const productDetails = getProductDetails(selectedProduct.item);
          const total = productDetails ? (productDetails.price * selectedProduct.quantity).toFixed(2) : 0;
          
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{productDetails.product_name}</td>
                <td>
                <img 
                      src={productDetails.product_picture}
                      alt={productDetails.product_name}
                      width="50"
                    />
                    </td>
                <td>{productDetails.stock }</td>
                <td>{productDetails.cogs }</td>
                <td>{productDetails.price }</td>
                <td>{selectedProduct.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TableProducts;
