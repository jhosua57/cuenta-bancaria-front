import React, { useState, useEffect } from 'react';
import AccountService from '../../services/AccountService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddAccountComponent = () => {
  const [producttype, setProductType] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { clientId, id } = useParams();

  const saveOrUpdateAccount = async (e) => {
    e.preventDefault();
    const account = { client: { id: clientId }, producttype, accountnumber, currency, amount, branch, clientId };

    try {
      if (id) {
        await AccountService.updateAccount(id, account);
      } else {
        await AccountService.createAccount(account);
      }
      navigate(`/cuentas-cliente/${clientId}`);
    } catch (error) {
      setError(error.message);
      console.error("Error al guardar la cuenta:", error);
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      if (id) {
        try {
          const data = await AccountService.getAccountById(id);
          setProductType(data.producttype);
          setAccountNumber(data.accountnumber);
          setCurrency(data.currency);
          setAmount(data.amount);
          setBranch(data.branch);
        } catch (error) {
          setError(error.message);
          console.error("Error con la cuenta:", error);
        }
      }
    };
    fetchAccount();
  }, [id]);

  const title = () => (
    <h2 className="text-center">{id ? "Editar cuenta" : "Registrar cuenta"}</h2>
  );

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <br />
            {title()}
            <hr />
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Tipo de producto</label>
                  <select className='form-select' value={producttype} onChange={(e) => setProductType(e.target.value)} required>
                    <option value="">Seleccione tipo de producto</option>
                    <option value="Caja de Ahorro">Caja de Ahorro</option>
                    <option value="Cuenta Corriente">Cuenta Corriente</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Número de cuenta</label>
                  <input
                    type="text"
                    name="accountnumber"
                    className="form-control"
                    value={accountnumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Moneda</label>
                  <select className='form-select' value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                    <option value="">Seleccione moneda</option>
                    <option value="BS">BS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Monto</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Sucursal</label>
                  <select className='form-select' value={branch} onChange={(e) => setBranch(e.target.value)} required>
                    <option value="">Seleccione sucursal</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Cochabamba">Cochabamba</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                  </select>
                </div>
                <hr />
                <button className="btn btn-success" onClick={saveOrUpdateAccount}>
                  Guardar
                </button>
                &nbsp;&nbsp;
                <Link to={`/cuentas-cliente/${clientId}`} className="btn btn-danger">
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
