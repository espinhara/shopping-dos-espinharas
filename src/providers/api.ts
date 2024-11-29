import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    Authorization: `Bearer ${localStorage?.token}`,
    'Content-Type': 'application/json',
  }
});

