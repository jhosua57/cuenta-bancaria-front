import axios from 'axios';

const API_URL = 'http://localhost:8080/api/accounts';

class AccountService {

    getAllAccounts = () => {
        return axios.get(API_URL);
    }

    getAccountsByClientId = (clientId) => {
        return axios.get(`${API_URL}/client/${clientId}`);
    };
    
    getAccountById = async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
    createAccount = async (account) => {
        const response = await axios.post(API_URL, account);
        return response.data;
    }
    
    updateAccount = async (id, account) => {
        const response = await axios.put(`${API_URL}/${id}`, account);
        return response.data;
    }
    
    deleteAccount = async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
}

export default new AccountService();