import axios from "axios"

const ApiClient = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default ApiClient