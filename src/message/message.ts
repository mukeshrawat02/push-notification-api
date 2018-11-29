import { credential, initializeApp, messaging, app } from 'firebase-admin';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class Message {
    @ApiModelPropertyOptional() readonly data?: { [key: string]: string };
    @ApiModelPropertyOptional() readonly notification?: messaging.Notification;
    @ApiModelPropertyOptional() readonly android?: messaging.AndroidConfig;
    @ApiModelPropertyOptional() readonly webpush?: messaging.WebpushConfig;
    @ApiModelPropertyOptional() readonly apns?: messaging.ApnsConfig;
}