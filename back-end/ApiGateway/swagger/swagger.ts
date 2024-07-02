import { config } from 'dotenv';
import { Application, Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AppConfigEnv from '../src/config/app.config';
config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Blog API',
      description:
        'API endpoints for a mini blog services documented on swagger',
      contact: {
        name: 'Desmond Obisi',
        email: 'info@miniblog.com',
        url: 'https://github.com/DesmondSanctity/node-js-swagger',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url:
          'http://localhost:' +
          AppConfigEnv.APP_PORT +
          AppConfigEnv.APP_BASE_URL,
        description: 'Local server',
      },
      {
        url: '<your live url here>',
        description: 'Live server',
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app: Application, port: number) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
