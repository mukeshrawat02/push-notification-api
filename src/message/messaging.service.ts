import { Injectable, HttpService } from '@nestjs/common';

import { FireBase } from './core/firebase';
import { Message } from './message';

@Injectable()
export class MessagingService {
    constructor(private readonly _http: HttpService, private readonly _firebase: FireBase) {
        this._firebase.configure();
    }
    
    async sendNotification(projectId: string, token: string, notification: Message): Promise<any> {
        try {
            return await this._firebase.sendNotification(projectId, token, notification);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}