import axios from 'axios';

const instance = axios.create({
        baseURL: 'yourbackendurl/api'
    });
    
export default instance;