import React from 'react';
import { useLocation , Link } from 'react-router-dom';
import { FaChartLine, FaRegSquarePlus, FaRegFileLines   } from "react-icons/fa6";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
 
function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="">
      <div className="py-1">
        <Link to="/" type="button" id='nav-link' className={`btn w-100 rounded-5 border-5 btn-outline-light ${currentPath === '/' ? 'active': ''}`}><FaChartLine/> Dashboard</Link>
      </div>
      <div className="py-1">
        <Link to="/add-invoice" id='nav-link' className={`btn w-100 rounded-5 border-5 btn-outline-light ${currentPath === '/add-invoice' ? 'active': ''}`}><FaRegSquarePlus /> Create Invoice</Link>
      </div>
      <div className="py-1">
        <Link to="/invoices" id='nav-link' className={`btn w-100 rounded-5 border-5 btn-outline-light ${currentPath === '/invoices' ? 'active': ''}`}><FaRegFileLines /> Invoices</Link>
      </div>
    </div>
  );
}
 
export default Navigation;