//client for making HTTP requests to The Movie Database (TMDb) API using the Axios library
import axiosClient from '../axios/axios.client.js';
import tmdbEndpoints from './tmdb.endpoints.js';
const tmdbApi = {
    //Axios is used to send a GET request to the corresponding TMDb API endpoint, returns a promise that resolves to the response data received from the TMDb API.
    mediaList: async({ mediaType, mediaCategory, page }) => axiosClient.get(
        tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetail: async({ mediaType, mediaId }) => axiosClient.get(
        tmdbEndpoints.mediaDetail({ mediaType, mediaId })
    ),
    mediaGenres: async({ mediaType }) => axiosClient.get(
        tmdbEndpoints.mediaGenres({ mediaType })
    ),
    mediaCredits: async({ mediaType, mediaId }) => axiosClient.get(
        tmdbEndpoints.mediaCredits({ mediaType, mediaId })
    ),
    mediaVideos: async({ mediaType, mediaId }) => axiosClient.get(
        tmdbEndpoints.mediaVideos({ mediaType, mediaId })
    ),
    mediaImages: async({ mediaType, mediaId }) => axiosClient.get(
        tmdbEndpoints.mediaImages({ mediaType, mediaId })
    ),
    mediaRecommend: async({ mediaType, mediaId }) => axiosClient.get(
        tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
    ),
    mediaSearch: async({ mediaType, query, page }) => axiosClient.get(
        tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),
    personDetail: async({ personId }) => axiosClient.get(
        tmdbEndpoints.personDetail({ personId })
    ),
    personMedias: async({ personId }) => axiosClient.get(
        tmdbEndpoints.personMedias({ personId })
    ),
};

export default tmdbApi;