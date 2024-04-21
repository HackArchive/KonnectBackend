import { IdentityProvider, TrinsicService } from '@trinsic/trinsic';
import { Request, Response } from 'express';
import { prisma } from '../Prisma';
import { openai, storage } from '../common';


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

       
        res.send({
            status: "success",
            data: data.data[0], 
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

        console.log(req.file?.destination)
        const gcs = storage.bucket("bucket_name"); // Removed "gs://" from the bucket name
        const storagepath = `profile-pics/${req.file?.filename}`;
        const result = await gcs.upload(`${req.file?.destination}/${req.file?.filename}`, {
            destination: storagepath,
            predefinedAcl: 'publicRead', // Set the file to be publicly readable
            metadata: {
                contentType: "application/plain", // Adjust the content type as needed
            }
        });
        return result[0].metadata.mediaLink;
        
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }

}
