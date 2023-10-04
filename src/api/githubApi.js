import axios from 'axios';

const token = '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';

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default instance;