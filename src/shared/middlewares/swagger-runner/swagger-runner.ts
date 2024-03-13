import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerRunner {
  private config: DocumentBuilder;
  private app: INestApplication;

  constructor(app) {
    this.app = app;
    this.config = new DocumentBuilder();
  }

  run() {
    this.createDocument();
  }

  private setup() {
    return this.config
      .setTitle(`Jelou test Api`)
      .setDescription(
        'Jelou test Api. Please login to get JWT. Use it in Blog and Comment endpoints.',
      )
      .setVersion('1.0')
      .addBearerAuth({
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `Please enter token in following format: Bearer <JWT>. You can get JWT by logging in.`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      })
      .build();
  }

  private createDocument() {
    const document = SwaggerModule.createDocument(this.app, this.setup());
    SwaggerModule.setup('/api/docs', this.app, document);
  }
}
