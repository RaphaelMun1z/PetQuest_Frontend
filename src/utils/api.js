import axios from 'axios'

// API
export default axios.create({
    baseURL: 'http://127.0.0.1:5000',
})