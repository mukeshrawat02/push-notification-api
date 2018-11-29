
import { Get, Post, Body, Req, Res, Controller, Param, Put, Logger } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { CreateDeviceDto } from './create-device.dto';

@Controller('device')
@ApiUseTags('notification')
export class DeviceController {
    constructor(private readonly _loggerService: Logger) { }

    @Get()
    async getDevices(@Res() response): Promise<any> {
        try {
            return response.send('');
        }
        catch (err) {
            return response.status(500).send(err);
        }
    }

    @Put('/:projectId/:customerId')
    async createDevice(
        @Res() response,
        @Param('projectId') projectId: string,
        @Param('customerId') customerId: string,
        @Body() body: CreateDeviceDto
        ): Promise<any> {
        try {
            return response.send({ status: 'success', message: `Device for '${projectId}' added successfully!` });
        }
        catch (err) {
            return response.send(err);
        }
    }

    @Post('/:projectId/:customerId/messages')
    async sendNotification(@Req() request, @Res() response, @Param('projectId') projectId: string, @Param('customerId') customerId: string): Promise<any> {
        try {
            return response.status(200).send('message');
        }
        catch (err) {
            this._loggerService.error(err);
            return response.status(500).send('Internal Server Error');
        }
    }
}