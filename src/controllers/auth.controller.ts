import { IdentityProvider, TrinsicService } from '@trinsic/trinsic';
import { Request, Response } from 'express';
import { prisma } from '../Prisma';
import { containerClient, openai } from '../common';


export const generateImage = async (req: Request,res: Response) => {

    try {   

        let dalle_api_prompt = `Generate a realistic image of a model captured with a Nikon D850 and a Nikon AF-S NIKKOR 70-200mm f/2.8E FL ED VR lens, lit with high-key lighting to create a soft and ethereal feel, with a shallow depth of field --ar 2:3- with the following attributes: ${req.body.model_description}`
        const data = await openai.images.generate({
            model: "dall-e-3",
            prompt:dalle_api_prompt,
            size:"1024x1024",
            quality:"hd",
            n:1,
        })
        
        const blobclient = containerClient.getBlockBlobClient("konnect")
        await blobclient.syncUploadFromURL(data.data[0].url!)
       
        res.send({
            status: "success",
            data: blobclient.url, 
        });
            

    } catch(e: any) {
        console.log(e);
        res.status(500).send({
            status: "danger",
            code: e.code
        });
    }

}



export const uploadProfilePic = async (req: Request,res: Response) => {

    try {

        const blobclient = containerClient.getBlockBlobClient("konnect")
        await blobclient.uploadFile(`${req.file?.destination}/${req.file?.filename}`)

        res.send({
            status: "success",
            data: blobclient.url, 
        });        
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }

}
