import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';

import { ApplicationModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    
    configureMiddleware(app);

    await app.listen(port);
}

function configureMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

bootstrap();