import express from "express";
import type { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("You've made it to the route of the backend");
  });

export default router;
  