import axios from 'axios';

import { ConfigRequests } from '../interfaces/Globals';

let conf: ConfigRequests = {
  baseURL: process.env.NEXT_PUBLIC_API_ACESSO,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

if (typeof localStorage !== 'undefined') {
  const currentUser = localStorage.getItem('current-user');
  if (currentUser) {
    const token = JSON.parse(currentUser).token;
    conf.headers['Authorization'] = `Bearer ${token}`;
  }
}

const dpge_acesso_api = axios.create(conf);

export default dpge_acesso_api;
