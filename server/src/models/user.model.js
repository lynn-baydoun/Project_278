//Schema defines the structure and property of the document in the MongoDB collection
//schema specifies the fields, their types and validation constraints 
//models are used to interact with the database
//models perform operations like querying inserting updating and deleting 
import mongoose from 'mongoose';
import modelOptions from './model.options.js'
import crypto from 'crypto';

//define a schema 
const userSchema = new mongoose.Schema({
    username: {

        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    salt: {
        type: String,
        required: true,
        select: false
    }
}, modelOptions)

//setting password, takes password as param, generates a rand salt and hashes the salt; the hash is stored as the user password
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex")
    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
}

//validating password, takes a password parameter, hashes it with the stored salt, and compares the resulting hash with the stored password hash, if they match, the password is valid
userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");

    return this.password === hash;
}

const userModel = mongoose.model("User", userSchema);

export default userModel;