import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

//checks if the media item is already a favorite for the user by querying the favoriteModel
const addFavorite = async(req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId,
        });
        if (isFavorite) return responseHandler.ok(res, isFavorite);
        //creates a new favorite by instantiating a favoriteModel and saving it to the database
        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id,
        });
        await favorite.save();
        responseHandler.created(res, favorite);
    } catch {
        responseHandler.error(res);
    }
};

//retrieves the favoriteId from the request parameters and finds the corresponding favorite in the database
const removeFavorite = async(req, res) => {
    try {
        const { favoriteId } = req.params;
        const favorite = await favoriteModel.deleteOne({
            user: req.user.id,
            _id: favoriteId,
        });

        //if not found then return not found
        if (!favorite) return responseHandler.notfound(res);
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const getFavoritesOfUser = async(req, res) => {
    try {
        //retrieves favorites from the database based on the user's ID and sorts them by the creation timestamp
        const favorite = await favoriteModel
            .find({
                user: req.user.id,
            })
            .sort("-createdAt");
        responseHandler.ok(res, favorite);
    } catch {
        responseHandler.error(res);
    }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };