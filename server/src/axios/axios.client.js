import axios from "axios";

const axiosClient = {
    get : async(url) => {
        const response = await axios.get(url, {
            headers : {
                Accept : "application/json",
                "Accept-Encoding": "identity"
            }
        });
        return response.data;
    },
    getWithAuthentication : async (url, token) => {
        const response = await axios.get(url, {
            headers : {
                Accept : "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept-Encoding": "identity"
            }
        });
    
        return response.data;
    }
}

export default axiosClient; 