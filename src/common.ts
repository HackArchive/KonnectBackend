import { TrinsicService } from "@trinsic/trinsic";
import * as dotenv from "dotenv";


dotenv.config();

export const AUTH_TOKEN = process.env.AUTH_TOKEN;
export const ECOSYSTEM_ID = process.env.ECOSYSTEM_ID;


export const trinsic = new TrinsicService({authToken: AUTH_TOKEN});