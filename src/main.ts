import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import TransformInterceptor from './common/interceptors/transform.interceptor';
import { PrismaClientService } from './prisma-client/prisma-client.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.NODE_ENV === 'development') {
    app.setGlobalPrefix('api');
  }

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
  });
  app.use(cookieParser());
  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());
  app.use(compression());

  const prismaClientService: PrismaClientService = app.get(PrismaClientService);

  prismaClientService.enableShutdownHooks(app);

  await app.listen(4000);
}
bootstrap();
