import axios from "axios"

const baseUrl = "http://localhost:5000/"
const apiClient = axios.create({
    baseURL: baseUrl
});
 

apiClient.interceptors.request.use(async (config) => {
        config.headers = {
          'Access-Control-Allow-Origin': '*'
        };
    
    return config
})
  
export {apiClient}