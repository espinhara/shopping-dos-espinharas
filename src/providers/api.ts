import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://shopping-dos-espinharas-backend.onrender.com/api/',
  headers: {
    Authorization: `Bearer ${localStorage?.token}`,
    'Content-Type': 'application/json',
  }
});

