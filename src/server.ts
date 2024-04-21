import express from 'express';
import * as dotenv from "dotenv";
import cors = require("cors");
import authRouter from './routes/auth.routes';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument = require("../swagger.json");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/api/auth", authRouter);


app.listen(3001, ()=> {
    console.log("application running")
})