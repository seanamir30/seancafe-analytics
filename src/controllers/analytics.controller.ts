import express, { Request, Response } from "express";
import { Analytics } from '../models/analytics.model';
import { corsOptions } from "../..";
import cors from 'cors';

const router = express.Router()

router.get('/api/analytics', cors(corsOptions) , async (req: Request, res: Response) => {
    const { url } = req.body
    if (url) {
        const analytics = await Analytics.find({ url: url })
        return res.status(200).send(analytics)
    }
    const analytics = await Analytics.find({})
    return res.status(200).send(analytics)
})

router.post('/api/analytics', cors(corsOptions) , async (req: Request, res: Response) => {
    const { url, userAgent } = req.body;
    console.log(url + userAgent)
    const analytics = Analytics.build({ url, userAgent })
    await analytics.save()
    return res.status(201).send(analytics)
})

export { router as analyticsController }