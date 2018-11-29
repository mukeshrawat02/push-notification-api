import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { DeviceModule } from '../../src/device/device.module';
import { DeviceService } from '../../src/device/core/device.service';
import { ApplicationModule } from '../../src/app.module';

describe('Device (e2e)', () => {
    let app: INestApplication;
    let token: string;

    const mockRepository = {
        findOne() { },
        find() { },
        save() { },
        deleteMany() { },
    };

    const mockDeviceService = {
        getDevice() {
            return Promise.resolve({
                customerId: '1',
                projectId: 'notification_1',
                token: 'banana:token'
            });
        },
        getDevices() {
            return Promise.resolve([{
                customerId: '1',
                projectId: 'notification_1',
                token: 'banana:token'
            }, {
                customerId: '2',
                projectId: 'notification_2',
                token: 'apple:token'
            }]);
        },
        saveDevice(data) {
            return Promise.resolve({
                customerId: '1',
                projectId: 'notification_1',
                token: 'banana:token'
            });
        },
        deleteDevice(data) {
            return Promise.resolve(true);
        },
    };

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [DeviceModule],
        })
            .overrideProvider(DeviceService)
            .useValue(mockDeviceService)
            .overrideProvider(getModelToken('devices'))
            .useValue(mockRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/device (GET)', async () => {
        const expected = {
            customerId: '1',
            projectId: 'notification_1',
            token: 'banana:token'
        };

        const result = await request(app.getHttpServer())
            .get('/device')
            .set('Accept', 'application/json');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(expected),
            ]),
        );
    });

    it('/:projectId/:customerId (PUT)', async () => {
        const result = await request(app.getHttpServer())
            .put('/device/notification_1/1')
            .set('Accept', 'application/json');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            status: 'success',
            message: 'Device for \'notification_1\' added successfully!',
        });
    });

    it('/:projectId/:customerId/messages (POST)', async () => {
        const result = await request(app.getHttpServer())
            .post('/device/notification_1/1/messages')
            .set('Accept', 'application/json');

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({
            message: 'Notification sent',
        });
    });

    afterAll(async () => {
        await app.close();
    });
});