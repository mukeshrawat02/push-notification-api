import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './create-device.dto';
import { MessagingModule } from '../../message/messaging.module';
import { MessagingService } from '../../message/messaging.service';
import { Message } from '../../message/message';

let mockRepository = {
    findOne(conditions?: any) {
        return {
            exec: () => Promise.resolve({
                customerId: '1',
                projectId: 'notification_1',
                token: 'banana:token'
            }),
        };
    },
    find(conditions?: any) {
        return {
            exec: () => Promise.resolve([{
                customerId: '1',
                projectId: 'notification_1',
                token: 'banana:token'
            },
            {
                customerId: '2',
                projectId: 'notification_2',
                token: 'apple:token'
            }]),
        };
    },
    create(...docs: any[]) {
        return Promise.resolve({});
    },
    deleteOne(conditions: any) {
        return {
            exec: () => Promise.resolve({}),
        };
    },
};

const mockMessagingService = {
    sendNotification(projectId: string, token: string, notification: Message): Promise<any> {
        return Promise.resolve({ data: 'notification_sent', token: 'banana:token' });
    }
}

describe('DeviceController', () => {
    let deviceController: DeviceController;
    let deviceService: DeviceService;

    const response = {
        send: (body?: any) => body,
        status: (code: number) => {
            return {
                send: (body?: any) => {
                    return {
                        statusCode: code,
                        data: body,
                    };
                },
            };
        },
    };

    beforeEach(async () => {
        await initializeModule();
    });

    const initializeModule = async () => {
        const module = await Test.createTestingModule({
            imports: [MessagingModule],
            controllers: [DeviceController],
            providers: [Logger, DeviceService],
        })
            .overrideProvider(MessagingService)
            .useValue(mockMessagingService)
            .overrideProvider(getModelToken('devices'))
            .useValue(mockRepository)
            .compile();

        deviceService = module.get<DeviceService>(DeviceService);
        deviceController = module.get<DeviceController>(DeviceController);
    };

    it('should be created', () => {
        expect(deviceController).toBeDefined();
    });

    describe('getDevices()', () => {
        it('should return an array of devices', async () => {
            const result = [{
                customerId: '1',
                projectId: 'notification_1',
                token: 'banana:token'
            },
            {
                customerId: '2',
                projectId: 'notification_2',
                token: 'apple:token'
            }];
            expect(await deviceController.getDevices(response)).toEqual(result);
        });

        it('should throw 500 when database is down', async () => {
            mockRepository = {
                ...mockRepository,
                find(conditions: any) {
                    return {
                        exec: () => Promise.reject({ message: 'connect ECONNREFUSED 127.0.0.1:27017' }),
                    };
                },
            };
            await initializeModule();

            const res = await deviceController.getDevices(response);
            expect(res.statusCode).toEqual(500);
        });
    });

    describe('createDevice()', () => {
        let projectId, customerId;
        beforeAll(() => {
            projectId = 'notification_1';
            customerId = '1';
        });

        it('should return \'Unprocessable Entity\' if fcm token is empty', async () => {
            const createDeviceDto: CreateDeviceDto = {
                fcmToken: null,
                bundleId: '',
                sandbox: true
            };

            const res = await deviceController.createDevice(response, projectId, customerId, createDeviceDto);
            expect(res.message).toEqual('Unprocessable Entity');
        });

        it('should add device and return status success', async () => {
            const createDeviceDto: CreateDeviceDto = {
                fcmToken: 'banana:token',
                bundleId: 'bundle_1',
                sandbox: true
            };

            const res = await deviceController.createDevice(response, projectId, customerId, createDeviceDto);
            expect(res.message).toEqual(`Device for '${projectId}' added successfully!`);
            expect(res.status).toEqual('success');
        });
    });

    // describe('sendNotification()', () => {
    //     const params = {
    //         projectId: '',
    //         customerId: '',
    //     };
    //     beforeAll(() => {
    //         params.projectId = 'wallet';
    //         params.customerId = 'wallet_customer';
    //     });

    //     it('should send notification', async () => {
    //         request.body = {
    //             data: {
    //                 message: 'notification_sent',
    //             },
    //         };
    //         const res = await deviceController.sendNotification(request, response, params);
    //         expect(res.statusCode).toEqual(200);
    //         expect(res.data).toEqual({ data: 'notification_sent', token: 'banana:token' });
    //     });

    //     it('should send OK when error code is \'messaging/registration-token-not-registered\'', async () => {
    //         mockMessagingService.sendNotification = () => Promise.reject({ code: 'messaging/registration-token-not-registered' });
    //         await initializeModule();

    //         deviceController.sendNotification(request, response, params).catch(err => {
    //             expect(err.statusCode).toEqual(200);
    //             expect(err.data).toEqual('OK');
    //         });
    //     });

    //     it('should send 500 when error code is different from \'messaging/registration-token-not-registered\'', async () => {
    //         mockMessagingService.sendNotification = () => Promise.reject({ code: 'messaging/invalid-data-payload-key' });
    //         await initializeModule();

    //         deviceController.sendNotification(request, response, params).catch(err => {
    //             expect(err.statusCode).toEqual(500);
    //             expect(err.data).toEqual('Internal Server Error');
    //         });
    //     });

    //     it('should send 500 when database connection is down', async () => {
    //         mockMessagingService.sendNotification = () => Promise.reject({ code: 'messaging/registration-token-not-registered' });
    //         mockRepository = {
    //             ...mockRepository,
    //             deleteOne(conditions: any) {
    //                 return {
    //                     exec: () => Promise.reject({ message: 'connect ECONNREFUSED 127.0.0.1:27017' }),
    //                 };
    //             },
    //         };
    //         await initializeModule();

    //         const res = await deviceController.sendNotification(request, response, params);
    //         expect(res.statusCode).toEqual(500);
    //     });

    //     it('should send OK when Project Id or Customer Id empty', async () => {
    //         params.projectId = '';
    //         params.customerId = '';

    //         const res = await deviceController.sendNotification(request, response, params);
    //         expect(res).toEqual('OK');
    //     });
    // });
});