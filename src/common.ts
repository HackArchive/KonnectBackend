import * as dotenv from "dotenv";
import OpenAI from "openai";
import { Storage } from "@google-cloud/storage";


dotenv.config();

export const DALLE_API = process.env.DALLE_API;
export const BUCKET_NAME=process.env.BUCKET_NAME; 
export const KEY_FILE_NAME=process.env.KEY_FILE_NAME;

export const openai = new OpenAI({
    apiKey: DALLE_API,
  });
  
  
export const storage = new Storage({
  projectId: BUCKET_NAME,
  keyFilename: `../${KEY_FILE_NAME}`,
});