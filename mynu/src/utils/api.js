import axios from "axios"

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchMenuBySearch = (searchVal) = API.get(`/menu_items/search?searchVal=${searchVal.search || 'none'}`);
