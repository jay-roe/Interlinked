import express from "express";
import type { Request, Response } from 'express';

const router = express.Router();

router.get(`/`, (req: Request, res: Response) => {
    res.send(`Congrats! You've made it to the SAMPLE area`);
  });

export default router;
  