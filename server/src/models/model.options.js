//defines configuration options for a model in a database
const modelOptions = {
    toJSON: {
        virtuals: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj
        }
    },
    toObject: {
        virtuals: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj
        }
    },
    versionKey: false,
    timestamps: true
}

export default modelOptions;