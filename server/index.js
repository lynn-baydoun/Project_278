import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from "body-parser";
import http from 'http';
import mongoose from 'mongoose';
import "dotenv/config";
import routes from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.set('runValidators', true);

mongoose.connect(process.env.MONGODB_URL, {dbName: 'test',  useNewUrlParser: true}).then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
}).catch((err) => {
    console.log({ err });
    process.exit(1);
})

app.use("/api/v1/", routes)

const port = process.env.PORT || 5000;
const server = http.createServer(app);
