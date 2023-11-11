//setting up a configuration for making API requests to a service
const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params);
    //construct URLs for API requests
    return `${baseUrl}${endpoint}?api_key=${key}&${qs}`
}
export default { getUrl }