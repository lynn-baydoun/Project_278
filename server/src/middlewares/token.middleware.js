import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

//extract the JWT from the Authorization header in the request
//if the token exists, it splits the header to get the actual token
//then it verifies the token using jsonwebtoken.verify with a secret key(process.env.TOKEN_SECRET)
//it returns the decoded token otherwise, it returns false
const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            return jsonwebtoken.verify(
                token, process.env.TOKEN_SECRET
            )
        }
        return false;
    } catch {
        return false;
    }
}

//decode the JWT from the request
//find a user in the database using the decoded user ID (tokenDecoded.data) obtained from the JWT
//if a user is found, it attaches the user object to the req object (req.user) for further use in subsequent middleware or route handlers
const auth = async(req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    if (!tokenDecoded) return responseHandler.unauthorize(res);

    const user = await userModel.findById(tokenDecoded.data);

    if (!user) return responseHandler.unauthorized(res);

    req.user = user;

    next();
};

export default { auth, tokenDecode }