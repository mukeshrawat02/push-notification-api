import { Module, HttpModule } from '@nestjs/common';

import { MessagingService } from './messaging.service';
import { FireBase } from './core/firebase';

@Module({
  imports: [HttpModule],
  providers: [
    FireBase,
    MessagingService,
  ],
  exports: [MessagingService],
})
export class MessagingModule { }
