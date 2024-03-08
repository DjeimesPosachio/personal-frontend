import axios from 'axios';

export const useApi = () => ({
    validateToken: async (token) => {
        const response = await axios.post('/validate', { token });
        return response.data;
    },
    signIn: async (email, password) => {
        const repsonse = await axios.post('/login', { email, password });
        return repsonse.data;
    },
});