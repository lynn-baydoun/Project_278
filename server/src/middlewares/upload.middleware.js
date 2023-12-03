import  multer from "multer";
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', ()=>{
//     console.log("connected");
// })

const storage = new GridFsStorage({
    url : process.env.MONGODB_URL,
    file: (req, file) => {  
        console.log(file);
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return {filename};
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-${file.originalname}`,
            metadata: {}
        };
    },
});

const upload = multer({ storage });
export default upload; 