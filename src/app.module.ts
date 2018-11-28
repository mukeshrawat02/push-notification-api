import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/notification';
@Module({
    imports: [
        MongooseModule.forRoot(mongoUrl),
    ],
})
export class ApplicationModule { }