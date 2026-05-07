import dotenv from 'dotenv'
dotenv.config();

import express from 'express';

import { loginMiddleware } from './middleware/login.middleware';
import { apikeyMiddleware } from './middleware/apikey.middleware';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(loginMiddleware);
app.use(apikeyMiddleware);

app.get("/health", (req, res) => {
    res.send({ status: "ok" });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})