
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListClientsComponent from './components/ListClientsComponent';
import AddClientComponent from './components/AddClientComponent';
import { ListAccountComponent } from './components/ListAccountComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListClientsComponent />} />
            <Route path="/clientes" element={<ListClientsComponent />} />
            {/* <Route path="/clientes/:id" element={<ClienteDetails />} /> */}
            <Route path="/nuevo-cliente" element={<AddClientComponent />} />
            <Route path="/editar-cliente/:id" element={<AddClientComponent />} />
            <Route path="/cuentas-cliente/:id" element={<ListAccountComponent />} />
          </Routes>
        </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
