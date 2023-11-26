import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

//uses express-validator middleware to validate the incoming request body
router.post(
    "/signup",
    //checks if the username field exists in the request body
    body("username")
    .exists().withMessage("username is required")
    //checks if the username has a minimum length of 8 characters
    .isLength({ min: 1 }).withMessage("username with a minimum of 8 characters")
    ,
    body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 1 }).withMessage("password with a minimum of 8 characters"),
    body("confirmPassword")
    .exists().withMessage("confirmation is required")
    .isLength({ min: 1 }).withMessage("confirm?")
    .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("passwords do not match")
        return true
    }),
    body("displayName")
    .exists().withMessage("display name is required")
    .isLength({ min: 1 }).withMessage("display name with a minimum of 8 characters"),
    //if validation passes
    //to execute the validation
    //if there are validation errors, it will be handled by the requestHandler.validate
    requestHandler.validate,
    userController.signup
);
router.post(
    "/signin",
    body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 1 }).withMessage("username with a minimum of 8 characters"),
    body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 1 }).withMessage("password with a minimum of 8 characters"),
    requestHandler.validate,
    userController.signin
);

router.put(
    "/update-password",
    //for authentication using a JWT
    tokenMiddleware.auth,
    body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 1 }).withMessage("password with a minimum of 8 characters"),
    body("newPassword")
    .exists().withMessage("newPassword is required")
    .isLength({ min: 1 }).withMessage("newPassword with a minimum of 8 characters"),
    body("confirmNewPassword")
    .exists().withMessage("confirmNewPassword is required")
    .isLength({ min: 1 }).withMessage("confirmNewPassword with a minimum of 8 characters")
    .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("passwords do not match")
        return true
    }),
    requestHandler.validate,
    userController.updatePassword
);

router.get(
    '/info',
    tokenMiddleware.auth,
    userController.getInfo
);

router.get(
    '/favorites',
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
);

router.post(
    '/favorites',
    tokenMiddleware.auth,
    body('mediaType')
    .exists().withMessage("media type is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("media type invalid"),
    body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId cannot be empty"),
    body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
    .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    favoriteController.addFavorite
);

router.delete(
    "/favorites/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
)

export default router;