import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ISwaggerConfig } from './interface';
import { swaggerConfig } from './server.config';

export class SwaggerGenerator {
  private swagger: ISwaggerConfig;
  private readonly useAuth: {
    username: string;
    password: string;
  };

  constructor() {
    const swagger = swaggerConfig();
    this.swagger = swagger;
    this.useAuth = { username: swagger.SWAGGER_USER_NAME, password: swagger.SWAGGER_PASSWORD };
  }

  private lockDocumentationForUnAuthenticatedUser(app: INestApplication) {
    const { username, password } = this.useAuth;

    app.use(
      [this.swagger.SWAGGER_API, `${this.swagger.SWAGGER_API}-json`],
      basicAuth({
        challenge: true,
        users: {
          [username]: password,
        },
      })
    );
  }

  public async load(app: INestApplication) {
    if (this.swagger.SWAGGER_ALLOW === 'yes') {
      if (this.useAuth && this.useAuth.username && this.useAuth.password) {
        this.lockDocumentationForUnAuthenticatedUser(app);
      }
      const options: SwaggerDocumentOptions = {
        ignoreGlobalPrefix: true,
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
      };

      const document = SwaggerModule.createDocument(
        app,
        SwaggerGenerator.buildSwaggerDocument(),
        options
      );

      SwaggerModule.setup(this.swagger?.SWAGGER_API, app, document);
    }
  }

  private static buildSwaggerDocument() {
    return new DocumentBuilder()
      .addServer('/api')
      .build();
  }
}
