
import { Pagination } from 'react-bootstrap';

function Pagin({currentPage, totalPages, handlePageChange}) {
    const renderPaginationItems = () => {
        let items = [];
    
        if (currentPage > 2) {
          items.push(
            <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageChange(1)}>
              1
            </Pagination.Item>
          );
    
          if (currentPage > 3) {
            items.push(<Pagination.Ellipsis key="start-ellipsis" />);
          }
        }
    
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
    
        for (let page = startPage; page <= endPage; page++) {
          items.push(
            <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
              {page}
            </Pagination.Item>
          );
        }
    
        if (currentPage < totalPages - 2) {
          items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }
    
        if (currentPage < totalPages - 1) {
          items.push(
            <Pagination.Item key={totalPages} active={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </Pagination.Item>
          );
        }
    
        return items;
      };

    return (
        <div className="w-100 mt-4">
            <Pagination className="justify-content-center text-dark">
                <Pagination.First disabled={currentPage === 1} onClick={() => handlePageChange(1)} 
                    className=''/>
                <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />

                {renderPaginationItems()}

                <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
                <Pagination.Last disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)} />
            </Pagination>
        </div>
    )
}

export default Pagin;