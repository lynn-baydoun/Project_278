import userModel from "../models/user.model.js"
import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import secondPartyLogin from "../secondPartyLogin/secondPartyLogin.api.js";
const signup = async(req, res) => {
    try {
        //extracting username, password, displayName from req.body
        const { username, password, displayName,dateOfBirth, country, gender } = req.body;

        const checkUser = await userModel.findOne({ username });

        if (checkUser) return responseHandler.badRequest(res, "username already used")

        const user = new userModel();

        user.displayName = displayName;
        user.username = username;
        user.dateOfBirth = dateOfBirth;
        user.country = country;
        user.gender = gender;
        user.setPassword(password);
        user.save();

        //setting user properties, saving to the database
        //generates a JWT token for the user and sends it in the response along with user information
        //excludes sensitive data such as the password and salt from the response
        const token = jsonwebtoken.sign({ data: user.id },
            process.env.TOKEN_SECRET, { expiresIn: "24h" }
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            createdAt : Date.now(),
            id: user.id
        })
    } catch {
        responseHandler.error(res)
    }
};

const signupGoogle = async(req, res) => {
    try {
        //extracting username, password, displayName from req.body
        const { googleAccessToken } = req.body;

        const response = await secondPartyLogin({ googleAccessToken: googleAccessToken});

        const checkUser = await userModel.findOne({ username });

        if (checkUser) return responseHandler.badRequest(res, "username already used")

        const user = new userModel();

        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);
        user.save();

        //setting user properties, saving to the database
        //generates a JWT token for the user and sends it in the response along with user information
        //excludes sensitive data such as the password and salt from the response
        const token = jsonwebtoken.sign({ data: user.id },
            process.env.TOKEN_SECRET, { expiresIn: "24h" }
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            createdAt : Date.now(),
            id: user.id
        })
    } catch {
        responseHandler.error(res)
    }
};
//retrieves the user from the database based on the provided username
//checks if the user exists & if the provided password is correct
const signin = async(req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await userModel.findOne({ username }).select("username password salt id displayName dateOfBirth");
        if (!user) return responseHandler.badRequest(res, "User does not exist");
        if (! await user.validPassword(password)) return responseHandler.badRequest(res, "Wrong password");

        const token = jsonwebtoken.sign({ data: user.id },
            process.env.TOKEN_SECRET, { expiresIn: "24h" }
        );

        user.password = undefined;
        user.salt = undefined;
        responseHandler.created(res, {
            token,
            ...user._doc,
            createdAt : Date.now(),
            id: user.id
        })
    } catch (err){
        responseHandler.error(res)
    }
};


const updatePassword = async(req, res) => {
    try {
        //retrieves the user from the database based on the authenticated user's ID
        const { password, newPassword } = req.body;
        
        const user = await userModel.findById(req.user.id).select("password id salt");
        if (!user) return responseHandler.unauthorized(res);
        if (! user.validPassword(password)) return responseHandler.badRequest(res, "Wrong password")
        user.setPassword(newPassword)

        await user.save()

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res)
    }
};

const updateUserDetails = async(req, res) => {
    try {
        //retrieves the user from the database based on the authenticated user's ID
        const { displayName, country,gender, dateOfBirth } = req.body;

        const user = await userModel.findById(req.user.id).select("displayName gender country dateOfBirth");
        if (!user) return responseHandler.badRequest(res, "user does not exist");

        user.displayName = displayName;
        user.dateOfBirth = dateOfBirth;
        user.country = country;
        user.gender = gender;

        await user.save()
        responseHandler.ok(res);
    } catch (err){
        responseHandler.error(res)
    }
};

const getInfo = async(req, res) => {
    
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) return responseHandler.notfound(res); 
        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res)
    }
};

export default {
    signup,
    signin,
    getInfo,
    updatePassword,
    updateUserDetails
};