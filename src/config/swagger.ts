import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tennis Players API',
      version: '1.0.0',
      description:
        'A comprehensive API for managing tennis players and their statistics',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: '/',
        description: 'Current server',
      },
    ],
    tags: [
      {
        name: 'Players',
        description: 'Tennis players management endpoints',
      },
      {
        name: 'Statistics',
        description: 'Player statistics and rankings',
      },
    ],
    components: {
      schemas: {
        Player: {
          type: 'object',
          required: [
            'id',
            'firstname',
            'lastname',
            'shortname',
            'sex',
            'country',
            'picture',
            'data',
          ],
          properties: {
            id: {
              type: 'integer',
              description: 'Player unique identifier',
              example: 52,
            },
            firstname: {
              type: 'string',
              description: 'Player first name',
              example: 'Novak',
            },
            lastname: {
              type: 'string',
              description: 'Player last name',
              example: 'Djokovic',
            },
            shortname: {
              type: 'string',
              description: 'Player short name',
              example: 'N.DJO',
            },
            sex: {
              type: 'string',
              enum: ['M', 'F'],
              description: 'Player gender',
              example: 'M',
            },
            country: {
              type: 'object',
              properties: {
                picture: {
                  type: 'string',
                  description: 'Country flag URL',
                },
                code: {
                  type: 'string',
                  description: 'Country ISO code',
                  example: 'SRB',
                },
              },
            },
            picture: {
              type: 'string',
              description: 'Player profile picture URL',
            },
            data: {
              type: 'object',
              properties: {
                rank: {
                  type: 'integer',
                  description: 'Player world ranking',
                  example: 2,
                },
                points: {
                  type: 'integer',
                  description: 'Player ranking points',
                  example: 2542,
                },
                weight: {
                  type: 'integer',
                  description: 'Player weight in grams',
                  example: 80000,
                },
                height: {
                  type: 'integer',
                  description: 'Player height in cm',
                  example: 188,
                },
                age: {
                  type: 'integer',
                  description: 'Player age in years',
                  example: 31,
                },
                last: {
                  type: 'array',
                  description: 'Last 5 match results',
                  items: {
                    type: 'integer',
                    enum: [0, 1],
                  },
                  example: [1, 0, 0, 0, 1],
                },
              },
            },
          },
        },
        Statistics: {
          type: 'object',
          properties: {
            country: {
              type: 'object',
              description: 'Country with most wins',
              properties: {
                code: {
                  type: 'string',
                  example: 'SRB',
                },
                wins: {
                  type: 'integer',
                  example: 5,
                },
              },
            },
            averageBMI: {
              type: 'number',
              description: 'Average BMI of all players',
              example: 23.5,
            },
            medianHeight: {
              type: 'number',
              description: 'Median height of all players in cm',
              example: 185,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
            error: {
              type: 'string',
              example: 'Detailed error information',
            },
          },
        },
      },
    },
  },

  // Scan both source and compiled files
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './dist/routes/*.js',
    './dist/controllers/*.js',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
