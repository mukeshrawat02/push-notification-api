import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { DeviceModule } from '../../src/device/device.module';
import { MessagingService } from '../../src/message/messaging.service';
import { Message } from '../../src/message/message';

describe('Device (e2e)', () => {
    let app: INestApplication;
    const mockRepository = {
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

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [DeviceModule],
        })
            .overrideProvider(MessagingService)
            .useValue(mockMessagingService)
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
            .send({ fcmToken: 'banana:token' })
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