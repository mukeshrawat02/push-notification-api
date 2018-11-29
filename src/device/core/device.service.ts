import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IDevice } from './device.interface';
import { BaseDataService } from '../../common/base-data.service';

@Injectable()
export class DeviceService extends BaseDataService {
    constructor(@InjectModel('devices') private readonly _deviceModel: Model<IDevice>) {
        super();
    }

    async getDevice(projectId: string, customerId: string): Promise<IDevice> {
        try {
            return await this._deviceModel.findOne({ projectId, customerId }).exec();
        } catch (error) {
            return this.throwInternalServerError(error);
        }
    }

    async getDevices(): Promise<any> {
        try {
            return await this._deviceModel.find().exec();
        } catch (error) {
            return this.throwInternalServerError(error);
        }
    }

    async saveDevice(data: IDevice): Promise<IDevice> {
        if (data.projectId && data.customerId && data.token) {
            try {
                return await this._deviceModel.create(data);
            } catch (error) {
                return this.throwInternalServerError(error);
            }
        }
        return this.throwUnProcessableEntity();
    }

    async deleteDevice(projectId: string, customerId: string): Promise<any> {
        try {
            return await this._deviceModel.deleteOne({ projectId, customerId }).exec();
        } catch (error) {
            return this.throwInternalServerError(error);
        }
    }
}