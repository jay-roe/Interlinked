import express from "express";
import type { Request, Response } from 'express';
import myFunction from "./sampleHelper";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("You've made it to the route of the backend");
  });

router.get('/sample', (req: Request, res: Response) => {
    const calculatedValue = myFunction(2, 3);
    res.send(`Congrats! You've made it to the SAMPLE area ${calculatedValue}`);
  });

export default router;
  