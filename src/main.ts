import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './shared/error-handle/error-filter';
import { SwaggerRunner } from './shared/middlewares/swagger-runner/swagger-runner';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpErrorFilter());
  new SwaggerRunner(app).run();
  await app.listen(process.env.PORT, () => {
    console.log('app listening on port:', process.env.PORT);
  });
}
bootstrap();
