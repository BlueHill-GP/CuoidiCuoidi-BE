import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  userId: string;
  owenService?: string
}

export interface bookingRequest extends Request {
  userId: string;
  owenService: string;
}
