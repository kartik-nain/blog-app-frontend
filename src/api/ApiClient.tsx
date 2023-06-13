import axios from "axios"

const ApiClient = axios.create({
    baseURL: 'https://ill-blue-chick-yoke.cyclic.app/'
})

export default ApiClient