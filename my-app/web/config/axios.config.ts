// api/axios.js (or a dedicated file)
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Set your Express server's API base URL
    headers: {
        'Content-Type': 'application/json', // Default content type
        'Access-Control-Allow-Origin': '*',
        'x-api-key': process.env.NEXT_PUBLIC_GATEWAY_KEY,
    },
});

// Optional: Add interceptors for authentication, error handling, etc. (explained later)

export default api;
