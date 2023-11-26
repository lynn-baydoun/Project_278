import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js"

// handles requests to retrieve a list of media items from TMDB; extracts parameters from the request(page, mediaType, and mediaCategory) calls tmdbApi.mediaList to fetch the list from TMDB and sends the response using the responseHandler
const getList = async(req, res) => {
    try {
        const { page } = req.body;
        const { mediaType, mediaCategory } = req.params;
        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });
        return responseHandler.ok(res, response);
    } catch{
        responseHandler.error(res)
    }
};

const getGenres = async(req, res) => {
    try {
        const { mediaType } = req.params;
        const response = await tmdbApi.mediaGenres({ mediaType });
        return responseHandler.ok(res, response);

    } catch (err){
        responseHandler.error(res)
    }
};

const search = async(req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;
        const response = await tmdbApi.mediaSearch({
            query,
            page,
            //checks if the mediaType = "people", if true, sets it to "person"
            mediaType: mediaType === "people" ? "person" : mediaType
        });
        return responseHandler.ok(res, response);

    } catch {
        responseHandler.error(res)
    }
};

const getDetail = async(req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const params = { mediaType, mediaId };

        const media = await tmdbApi.mediaDetail(params);
        media.credits = await tmdbApi.mediaCredits(params);
        const videos = await tmdbApi.mediaVideos(params)
        media.videos = videos;
        const recommend = await tmdbApi.mediaRecommend(params);
        media.recommend = recommend.results;
        media.images = await tmdbApi.mediaImages(params);
        //to decode the JWT token from the request
        const tokenDecoded = tokenMiddleware.tokenDecode(req);

        //if a valid token is found, it fetches user information and checks if the media item is a favorite for the user
        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data);
            if (user) {
                const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
                media.isFavorite = isFavorite !== null;
            }
        }
        //populates the media.reviews field by fetching reviews from the database
        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");

        return responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res)
    }
};

export default {
    getList,
    getGenres,
    search,
    getDetail
}