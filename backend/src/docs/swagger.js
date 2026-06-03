import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GiziMeal API',
      version: '1.0.0',
      description: 'Dokumentasi lengkap API GiziMeal',
    },
    servers: [
      {
        url: 'http://localhost:3000'
      },
    ],
  },
  apis: ['./src/docs/swagger.docs.js'],
};

export const swaggerSpec = swaggerJsdoc(options);