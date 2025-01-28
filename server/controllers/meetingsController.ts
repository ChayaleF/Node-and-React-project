import { addMeeting } from "../services/meetingsService";
import { Request, Response } from 'express';
import {  CustomError } from "../errors/CustomError"

const express = require('express');
const router = express.Router();

router.post('/addMeeting', async (req: Request, res: Response) => {
    try {
        const result = await addMeeting(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
        console.error('Error:', err);
    }
});
export default router;