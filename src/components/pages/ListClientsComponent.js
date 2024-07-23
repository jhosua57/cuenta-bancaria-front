import React, { useEffect, useState } from 'react'
import ClientService from '../../services/ClientService';
import { Link } from 'react-router-dom';

export const ListClientsComponent = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        ListClients();
    }, []);
    
    const ListClients = () => {
        ClientService.getAllClients().then((response) => {
            setClients(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };
    const deleteClient = async (id) => {
        await ClientService.deleteClient(id).then((response) => {
            ListClients();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
        setClients(clients.filter((client) => client.id !== id));
    };
    return (
        <div className='container'>
            <h2 className='text-center'> Lista de Clientes</h2>
            <Link to='/nuevo-cliente' className='btn btn-primary mb-2'>Agregar Cliente</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Documento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.paternal}</td>
                            <td>{client.maternal}</td>
                            <td>{client.documentidentity}</td>
                            <td>
                                <Link to={`/editar-cliente/${client.id}`} className="btn btn-info">Editar</Link>
                                
                                <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={() => deleteClient(client.id)} >Eliminar</button>
                                &nbsp;&nbsp;
                                <Link to={`/cuentas-cliente/${client.id}`} className="btn btn-info">Cuentas</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default ListClientsComponent;
