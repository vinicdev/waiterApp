import axios from 'axios';

export const api = axios.create({
  baseURL:'http://192.168.100.197:3001',
});
