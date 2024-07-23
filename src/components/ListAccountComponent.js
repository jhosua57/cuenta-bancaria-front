import React, { useEffect, useState } from 'react'
import AccountService from '../services/AccountService'
import { Link, useParams } from 'react-router-dom';

export const ListAccountComponent = () => {
    const { id } = useParams();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AccountService.getAccountsByClientId(id)
            .then(response => {
                setAccounts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Cliente {id}</h2>
            <div >
            <Link to='/crear-cuenta' className='btn btn-primary mb-2'>Crear cuenta</Link>
            &nbsp;&nbsp;
                <Link to="/clientes" className="btn btn-danger">Volver</Link>
                 <table className='table table-bordered table-striped'>
                     <thead>
                         <tr>
                             <th>Cliente</th>
                             <th>Tipo de cuenta</th>
                             <th>Numero de cuenta</th>
                             <th>Moneda</th>
                             <th>Monto</th>
                             <th>Sucursal</th>
                             <th>Acciones</th>
                         </tr>
                     </thead>
                     <tbody>
                         {accounts.map((account) =>(
                                    <tr key={account.id}>
                                        <td>{account.client.name}</td>
                                        <td>{account.producttype}</td>
                                        <td>{account.accountnumber}</td>
                                        <td>{account.currency}</td>
                                        <td>{account.amount}</td>
                                        <td>{account.branch}</td>
                                        <td>
                                            <button className='btn btn-info'>Detalles</button>
                                        </td>
                                    </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// export const ListAccountComponent = () => {
//     const [accounts, setAccounts] = useState([]);

//     useEffect(() => {
//         ListAccounts();
//     }, [])
    
//     const ListAccounts = () => {
//         AccountService.getAllAccounts().then((response) => {
//             setAccounts(response.data)
//             console.log(response.data)
//         }).catch(error => {
//             console.log(error)
//         })
//     }
//     return (
//         <div className='container'>
//             <h2 className='text-center'>Cuentas</h2>
//             <div className='row'>
//                 <table className='table table-bordered table-striped'>
//                     <thead>
//                         <tr>
//                             <th>Cliente</th>
//                             <th>Tipo de cuenta</th>
//                             <th>Numero de cuenta</th>
//                             <th>Moneda</th>
//                             <th>Monto</th>
//                             <th>Sucursal</th>
//                             <th>Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {accounts.map((account) =>(
//                                     <tr key={account.id}>
//                                         <td>{account.client.name}</td>
//                                         <td>{account.producttype}</td>
//                                         <td>{account.accountnumber}</td>
//                                         <td>{account.currency}</td>
//                                         <td>{account.amount}</td>
//                                         <td>{account.branch}</td>
//                                         <td>
//                                             <button className='btn btn-info'>Detalles</button>
//                                         </td>
//                                     </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

export default ListAccountComponent;
