import { Routes, Route } from 'react-router-dom';
import AddInvoice from './components/AddInvoice'
import Invoices from './components/Invoices'
import RevenueGraph from './components/RevenueGraph'
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="">
      <div className="row m-2 min-vh-100">
        <div className="col-md-4 col-lg-3 p-2">
          <div className="card rounded-5 border-5 border-white bg-light bg-opacity-50 text-white p-4 h-100 shadow">
            <Sidebar />
          </div>
        </div>
        <div className="col-md-8 col-lg-9 p-2">
          <div className="card rounded-5 border-5 border-white bg-light bg-opacity-50 text-white p-4 h-100 shadow">
            <main className="">
              <Routes>
                <Route path='/' element={<RevenueGraph />} />
                <Route path='/add-invoice' element={<AddInvoice />} />
                <Route path='/invoices' element={<Invoices />} />
                <Route path='/invoices/:id' element={<Invoices />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
