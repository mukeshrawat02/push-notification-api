import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceController } from './core/device.controller';
import { DeviceService } from './core/device.service';
import { DeviceSchema } from './core/device.schema';
import { MessagingModule } from '../message/messaging.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'devices', schema: DeviceSchema }]),
        MessagingModule
    ],
    controllers: [DeviceController],
    providers: [Logger, DeviceService],
})
export class DeviceModule { }