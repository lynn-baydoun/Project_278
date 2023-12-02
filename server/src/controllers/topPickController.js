import responseHandler from "../handlers/response.handler.js";
import topPickModel from "../models/topPick.model.js";

//checks if the media item is already a topPick for the user by querying the topPickModel
const addTopPick = async(req, res) => {
    try {
        const isTopPick = await topPickModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId,
        });
        if (isTopPick) return responseHandler.ok(res, isTopPick);
        //creates a new top Pick by instantiating a topPickModel and saving it to the database
        const topPick = new topPickModel({
            ...req.body,
            user: req.user.id,
        });
        await topPick.save();
        responseHandler.created(res, topPick);
    } catch {
        responseHandler.error(res);
    }
};

//retrieves the topPick from the request parameters and finds the corresponding topPick in the database
const removeTopPick = async(req, res) => {
    try {
        const { topPickId } = req.params;
        const topPick = await topPickModel.deleteOne({
            user: req.user.id,
            _id: topPickId,
        });

        //if not found then return not found
        if (!topPick) return responseHandler.notfound(res);
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const getTopPickOfUser = async(req, res) => {
    try {
        //retrieves topPick from the database based on the user's ID and sorts them by the creation timestamp
        const topPick = await topPickModel
            .find({
                user: req.user.id,
            })
            .sort("-createdAt");
        responseHandler.ok(res, topPick);
    } catch {
        responseHandler.error(res);
    }
};

export default { addTopPick, removeTopPick, getTopPickOfUser };