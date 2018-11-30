import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import * as nock from 'nock';

jest.mock('firebase-admin', () => {
  return {
    credential: {
      cert: (serviceAccountPathOrObject: string) => { },
    },
    initializeApp: () => { },
    messaging: () => {
      return {
        send: (message: any) => Promise.resolve({ data: 'notification_sent', token: 'banana:token' }),
      };
    },
  };
});

import { MessagingService } from './messaging.service';
import { MessageDto } from './message.dto';
import { FireBase } from './core/firebase';

describe('MessagingService', () => {
  const projectId = 'notification_1';
  let service: MessagingService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FireBase, MessagingService],
    })
      .compile();

    service = module.get<MessagingService>(MessagingService);
  });

  afterAll(() => {
    jest.unmock('firebase-admin');
  });

  describe('sendNotification()', () => {
    const token = 'banana:token';
    const notification: MessageDto = {
      data: {
        message: 'notification_sent',
      },
    };

    it('should call sendNotification method', async () => {
      expect(await service.sendNotification(projectId, token, notification))
        .toStrictEqual({ data: 'notification_sent', token: 'banana:token' });
    });

    it('should throw error for empty projectId', async () => {
      await service.sendNotification(null, token, notification).catch((err) => {
        expect(err.message).toEqual('project not found');
      });
    });
  });
});
