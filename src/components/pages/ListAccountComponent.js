import React, { useEffect, useState } from 'react'
import AccountService from '../../services/AccountService'
import { Link, useParams } from 'react-router-dom';
import ClientService from '../../services/ClientService';

export const ListAccountComponent = () => {
    const { clientId } = useParams();
    const [clientName, setClientName] = useState('');
    const [clientPaternal, setClientPaternal] = useState('');
    const [clientMaternal, setClientMaternal] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientAndAccounts = async () => {
            try {
                const clientResponse = await ClientService.getClientById(clientId);
                setClientName(clientResponse.data.name);
                setClientPaternal(clientResponse.data.paternal);
                setClientMaternal(clientResponse.data.maternal);

                const accountsResponse = await AccountService.getAccountsByClientId(clientId);
                setAccounts(accountsResponse.data);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchClientAndAccounts();
    }, [clientId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const ListAccounts = () => {
        AccountService.getAllAccounts().then((response) => {
            setAccounts(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const deleteAccount = async (id) => {
        await AccountService.deleteAccount(id).then((response) => {
            ListAccounts();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
        setAccounts(accounts.filter((account) => account.id !== id));
    };

    return (
        <div>
            <h2>Lista de Cuentas</h2>
            <br></br>
            <p>Cliente: {clientName} {clientPaternal} {clientMaternal}</p>
            <hr></hr>
            <div >
            <Link to={`/crear-cuenta/${clientId}`} className='btn btn-primary mb-2'>Crear cuenta</Link>
            &nbsp;&nbsp;
                <Link to="/clientes" className="btn btn-danger">Volver</Link>
                 <table className='table table-bordered table-striped'>
                     <thead>
                         <tr>
                             
                             <th>Tipo de cuenta</th>
                             <th>Numero de cuenta</th>
                             <th>Moneda</th>
                             <th>Monto</th>
                             <th>Sucursal</th>
                             <th>Acciones</th>
                         </tr>
                     </thead>
                     <tbody>
                        {accounts.length === 0 ? (
                            <tr>
                                <td colSpan={6}>No hay cuentas registradas</td>
                            </tr>
                        ):(accounts.map((account) =>(
                                    <tr key={account.id}>
                                        
                                        <td>{account.producttype}</td>
                                        <td>{account.accountnumber}</td>
                                        <td>{account.currency}</td>
                                        <td>{account.amount}</td>
                                        <td>{account.branch}</td>
                                        <td>
                                        <Link to={`/editar-cuenta/${clientId}/${account.id}`} className="btn btn-info">Editar</Link>
                                
                                <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={() => deleteAccount(account.id)} >Eliminar</button>
                                
                                            
                                        </td>
                                    </tr>
                        )))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListAccountComponent;
