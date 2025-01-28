import { addBusiness, getBusiness, updateBusiness } from "../services/businessService";
import { Request, Response } from 'express';
import {  CustomError } from "../errors/CustomError"

const express = require('express');
const router = express.Router();

router.get('/getBusiness', async (req: Request, res: Response) => {
    try {
        const result = await getBusiness();
        res.status(200).json(result);
    } catch (err: any) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});
router.post('/addBusiness', async (req: Request, res: Response) => {
    try {
        const result = await addBusiness(req.body);
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

router.put('/updateBusiness/:businessId', async (req: Request, res: Response) => {
    try {
        const businessId = parseInt(req.params.businessId);
        const updatedData = req.body;

        const result = await updateBusiness(businessId,  updatedData);
        res.status(200).json(result);
    } catch (err: any) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

export default router;
