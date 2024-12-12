import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Permite enviar cookies
});

// Interceptor de respuesta para manejar errores
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Ha ocurrido un error';

        if (error.response?.status === 401) {
            window.location.href = '/login';
            toast.error('Sesión expirada');
        } else {
            toast.error(message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;