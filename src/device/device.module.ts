import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceController } from './core/device.controller';
import { DeviceService } from './core/device.service';
import { DeviceSchema } from './core/device.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'devices', schema: DeviceSchema }]),
    ],
    controllers: [DeviceController],
    providers: [Logger, DeviceService],
})
export class DeviceModule { }