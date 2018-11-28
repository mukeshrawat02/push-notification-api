import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

import { ApplicationModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    const options = new DocumentBuilder()
        .setTitle('Push Notification API')
        .setDescription('API for registering devices and sending notification')
        .setVersion('1.0.0')
        .addTag('notification')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    configureMiddleware(app);

    await app.listen(port);
}

function configureMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

bootstrap();