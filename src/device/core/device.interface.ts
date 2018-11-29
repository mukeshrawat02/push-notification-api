import { Document } from 'mongoose';

export interface IDevice extends Document {
  projectId: string;
  customerId: string;
  token: string;
}