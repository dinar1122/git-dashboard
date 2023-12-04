import axios from 'axios';

const token = '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';

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default instance;