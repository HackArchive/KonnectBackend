import * as dotenv from "dotenv";
import OpenAI from "openai";
import http from "http";
import { BlobServiceClient } from "@azure/storage-blob";


dotenv.config();

export const DALLE_API = process.env.DALLE_API;
export const ACCOUNT_NAME=process.env.ACCOUNT_NAME; 
export const BUCKET_NAME=process.env.BUCKET_NAME;
export const SAS_TOKEN=process.env.SAS_TOKEN;

export const openai = new OpenAI({
    apiKey: DALLE_API,
});
  
const blobServiceClient = new BlobServiceClient(`https://${ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`);
export const containerClient = blobServiceClient.getContainerClient(BUCKET_NAME!);