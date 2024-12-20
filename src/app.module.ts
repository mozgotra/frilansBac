import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule} from './animals/animals.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [UsersModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
