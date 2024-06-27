import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const csrfMiddleware = csurf({ cookie: true });

  const ROOT_IGNORED_PATHS = ['/api/v1/orders/webhook'];
  app.use((req, res, next) => {
    if (ROOT_IGNORED_PATHS.includes(req.path)) {
      return next();
    }
    return csrfMiddleware(req, res, next);
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application running at http://localhost:${port}`);
}
bootstrap();
