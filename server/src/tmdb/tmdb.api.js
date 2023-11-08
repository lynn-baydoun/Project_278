import axiosClient from '../axios/axios.client.js';
import tmdbEndpoints from './tmdb.endpoints.js';

const tmdbApi = {
    mediaList: async({ mediaType, mediaCategory, page }) => axiosClient.get(
        tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetail: async({ mediaType, page }) => axiosClient.get(
        tmdbEndpoints.mediaDetail({ mediaType, page })
    ),
    mediaGenres: async({ mediaType }) => axiosClient.get(
        tmdbEndpoints.mediaGenres({ mediaType })
    ),
    mediaCredits: async({ mediaType, mediaId }) => axiosClient.get(
        tmdbEndpoints.mediaCredits({ mediaType, mediaId })
    ),
};

export default tmdbApi;