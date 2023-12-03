import tmdbConfig from "./tmdb.config.js";
//TMDB api client
//to generate URLs for various endpoints of The Movie Database (TMDb) API
const tmdbEndpoints = {
    // Generates a URL for fetching a list of media items based on parameters like mediaType , mediaCategory, and page
    mediaList: ({ mediaType, mediaCategory, page }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaCategory}`, {page}
    ),
    mediaDetail: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}`
    ),
    mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(
        `genre/${mediaType}/list`
    ),
    mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/credits`
    ),
    mediaVideos: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/videos`
    ),
    mediaRecommend: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/recommendations`
    ),
    mediaImages: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/images`
    ),
    mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(
        `search/${mediaType}`, { query, page }
    ),
    personDetail: ({ personId }) => tmdbConfig.getUrl(
        `person/${personId}`
    ),
    personMedias: ({ personId }) => tmdbConfig.getUrl(
        `person/${personId}/combined_credits`
    ),

};

export default tmdbEndpoints;