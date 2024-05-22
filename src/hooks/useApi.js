import axios from 'axios';

export const useApi = () => ({
    validateToken: async (token) => {
        const response = await axios.post('/validate', { token });
        return response.data;
    },
    signIn: async (email, password) => {
        const response = await axios.post('/v1/auth/login', email, password);
        return response.data;
    },
});
