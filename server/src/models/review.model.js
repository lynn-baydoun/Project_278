import mongoose, { Schema } from 'mongoose';
import modelOptions from './model.options.js';

export default mongoose.model(
    "Review",
    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: string,
            required: true
        },
        mediaType: {
            type: string,
            enum: ["tv", "movie"],
            required: true
        },
        mediaId: {
            type: string,
            required: true
        },
        mediaTitle: {
            type: string,
            required: true
        },
        mediaPoster: {
            type: string,
            required: true
        },
    }, modelOptions)
)
