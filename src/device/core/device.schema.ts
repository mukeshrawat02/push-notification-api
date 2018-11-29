import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
    projectId: { type: String },
    customerId: { type: String },
    token: { type: String },
}, { timestamps: true });

DeviceSchema.index({ projectId: 1, customerId: 1 });

export default DeviceSchema;