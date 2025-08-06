const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reservas Deportivas',
      version: '1.0.0',
      description: 'Documentación RESTful para la API de reservas deportivas'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            },
        },
    },
  },
  apis: ['./src/routes/*.js'],
  security: [{ bearerAuth: [] }],
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
