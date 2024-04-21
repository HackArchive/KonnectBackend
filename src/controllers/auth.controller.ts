import { IdentityProvider, TrinsicService } from '@trinsic/trinsic';
import { Request, Response } from 'express';
import { prisma } from '../Prisma';
import { containerClient, openai } from '../common';



export const createUser = async (req: Request,res: Response) => {

    try {   

        await prisma.user.create({
            data: {
                walletId: req.body.walletId,
                name: req.body.name,
                profile_pic: req.body.profile_pic
            }
        })
        

        res.send({
            status: "success",
            data: "User created", 
        }).status(201);
            

    } catch(e: any) {
        console.log(e);
        res.status(500).send({
            status: "danger",
            code: "something went wrong"
        });
    }
}


export const getUser = async (req: Request,res: Response) => {

    try {   

        let user = await prisma.user.findFirstOrThrow({
            where: {
                walletId: req.query.wallet_id?.toString()
            }
        })        

        res.send({
            status: "success",
            user: user, 
        }).status(200);
            

    } catch(e: any) {
        console.log(e);
        res.status(500).send({
            status: "danger",
            code: "something went wrong"
        });
    }

}



const generateImagefn = async (prompt: string) => {
    
    let dalle_api_prompt = `Generate a realistic image of a model captured with a Nikon D850 and a Nikon AF-S NIKKOR 70-200mm f/2.8E FL ED VR lens, lit with high-key lighting to create a soft and ethereal feel, with a shallow depth of field --ar 2:3- with the following attributes: ${prompt}`
        const data = await openai.images.generate({
            model: "dall-e-3",
            prompt:dalle_api_prompt,
            size:"1024x1024",
            quality:"hd",
            n:1,
    })
    
    const blobclient = containerClient.getBlockBlobClient("konnect")
    await blobclient.syncUploadFromURL(data.data[0].url!)
    return blobclient.url
}


export const createPost = async (req: Request,res: Response) => {

    try {   

        let user = await prisma.user.findFirstOrThrow({
            where: {
                walletId: req.query.wallet_id?.toString()
            }
        })   

        let image = await generateImagefn(req.body.prompt)

        let post = await prisma.post.create({
            data: {
                userId: user.id,
                imageURL: image,
                prompt: req.body.prompt
            }
        })        

        res.send({
            status: "success",
            post: post, 
        }).status(200);
            

    } catch(e: any) {
        console.log(e);
        res.status(500).send({
            status: "danger",
            code: "something went wrong"
        });
    }

}

export const allPosts = async (req: Request,res: Response) => {

    try {   

        let posts = await prisma.post.findMany({
            include: {
                user: true
            }
        })        

        res.send({
            status: "success",
            user: posts, 
        }).status(200);
            

    } catch(e: any) {
        console.log(e);
        res.status(500).send({
            status: "danger",
            code: "something went wrong"
        });
    }

}




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
