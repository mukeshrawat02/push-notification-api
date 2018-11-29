import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceModule } from './device/device.module';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/notification';
@Module({
    imports: [
        MongooseModule.forRoot(mongoUrl),
        DeviceModule
    ],
})
export class ApplicationModule { }