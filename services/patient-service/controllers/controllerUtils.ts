import { type Response } from 'express';

export function sendCreated (res: Response, data: Record<string, any>): Response {
  return res.status(201).json(data);
}

export function sendNotFound (res: Response, message: string): Response {
  return res.status(404).json({ message });
}

export function sendServerError (res: Response): Response {
  return res.status(500).json({ message: 'Server Error' });
}

export function sendUnauthorized (res: Response, message: string): Response {
  return res.status(401).json({ message });
}

export function sendSuccess (res: Response, message: string): Response {
  return res.status(200).json({ message });
}

export function sendBadRequest (res: Response, message: string): Response {
  return res.status(400).json({ message });
}
