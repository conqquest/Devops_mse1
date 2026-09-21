import { Request, Response } from 'express';
import * as terraformService from '../services/terraform.service';

export const getEnvironments = (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: terraformService.getEnvironments() });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEnvironmentStatus = (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: terraformService.getEnvironmentStatus(req.params.env) });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const validate = (req: Request, res: Response) => {
  res.json({ success: true, data: terraformService.validateConfig(req.params.env) });
};

export const plan = (req: Request, res: Response) => {
  res.json({ success: true, data: terraformService.runPlan(req.params.env) });
};

export const apply = (req: Request, res: Response) => {
  res.json({ success: true, data: terraformService.runApply(req.params.env) });
};

export const test = (req: Request, res: Response) => {
  res.json({ success: true, data: terraformService.runTest(req.params.env) });
};
