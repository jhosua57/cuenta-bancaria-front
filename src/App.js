
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListClientsComponent from './components/pages/ListClientsComponent';
import AddClientComponent from './components/pages/AddClientComponent';
import { ListAccountComponent } from './components/pages/ListAccountComponent';
import HeaderComponent from './components/navigation/HeaderComponent';
import FooterComponent from './components/navigation/FooterComponent';
import { AddAccountComponent } from './components/pages/AddAccountComponent';

function App() {
  return (
    <div>
      <BrowserRouter> 
        <HeaderComponent/><br />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListClientsComponent />} />
            <Route path="/clientes" element={<ListClientsComponent />} />
            {/* <Route path="/clientes/:id" element={<ClienteDetails />} /> */}
            <Route path="/nuevo-cliente" element={<AddClientComponent />} />
            <Route path="/editar-cliente/:id" element={<AddClientComponent />} />
            <Route path="/cuentas-cliente/:clientId" element={<ListAccountComponent />} />
            <Route path="/crear-cuenta/:clientId" element={<AddAccountComponent />} />
            <Route path="/editar-cuenta/:clientId/:id" element={<AddAccountComponent />} />
          </Routes>
        </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
