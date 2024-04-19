import { IdentityProvider, TrinsicService } from '@trinsic/trinsic';
import { Request, Response } from 'express';
import { trinsic, ECOSYSTEM_ID } from '../common';
import { prisma } from '../Prisma';

export const sendOTP = async (req: Request,res: Response) => {

    try {

        let authInitResponse = await trinsic.wallet().authenticateInit({
            identity: req.body.email,
            provider: IdentityProvider.Email,
            ecosystemId: ECOSYSTEM_ID
        });
        
        res.send({
            status: "success",
            code: 0, 
            ...authInitResponse
        });
            

    } catch(e: any) {
        console.log(e);
        res.status(500).send({
            status: "danger",
            code: e.code
        });
    }

}

