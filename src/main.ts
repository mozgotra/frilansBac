import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

  })
  // app.enableCors({
  //   origin: 'https://user615319499-s2x34i3t.tunnel.vk-apps.com/',
    
  //   credentials: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

  // })
  await app.listen(3000);
}
bootstrap();
