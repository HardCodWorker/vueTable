import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://65a7ca3a94c2c5762da78f5e.mockapi.io'
})