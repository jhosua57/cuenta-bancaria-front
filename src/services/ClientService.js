import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clients';
class ClientService {
    getAllClients() {
        return axios.get(API_URL);
    }

    createClient =  (client) => {
        return axios.post(API_URL, client);
    }
    
    getClientById =  (id) => {
        return axios.get(`${API_URL}/${id}`);
    }

    updateClient =  (id, client) => {
        return axios.put(`${API_URL}/${id}`, client);
    }

    deleteClient =  (id) => {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ClientService();