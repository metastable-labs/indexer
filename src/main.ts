import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('APPLE_BUNDLE_ID:', process.env.APPLE_BUNDLE_ID);
  console.log('APPLE_TEAM_ID:', process.env.APPLE_TEAM_ID);
  console.log('RP_ID:', process.env.RP_ID);
  console.log('RP_NAME:', process.env.RP_NAME);

  await app.listen(3006);
}
bootstrap();
