import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): any {
  const logger: Logger = new Logger('Swagger');
  const swaggerEndpoint = '/api/v2/api-docs';

  const options = new DocumentBuilder()
    .setTitle('Schedule importer')
    .setDescription('Backend for schedule importer app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
  logger.log(`Added swagger on endpoint ${swaggerEndpoint}`);
}
