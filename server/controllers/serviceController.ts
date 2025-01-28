import { addService, deleteService, getServices, updateService } from "../services/servicesService";
import { Request, Response } from 'express';
import {  CustomError } from "../errors/CustomError"

const express = require('express');
const router = express.Router();

router.post('/addService', async (req: Request, res: Response) => {
    try {
        const result = await addService(req.body);
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

router.put('/updateService/:serviceId', async (req: Request, res: Response) => {
    try {
        const serviceId = parseInt(req.params.serviceId);
        const updatedData = req.body;

        const result = await updateService(serviceId,  updatedData);
        res.status(200).json(result);
    } catch (err: any) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});
router.get('/getServices', async (req: Request, res: Response) => {
    try {
        const result = await getServices();
        res.status(200).json(result);
    } catch (err: any) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});
router.get('/deleteServiceById/:serviceId', async (req: Request, res: Response) => {
    try {
        const serviceId=parseInt(req.params.serviceId);
        const result = await deleteService(serviceId);
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
