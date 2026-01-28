const swaggerJsdoc = require('swagger-jsdoc')
const config = require('./index')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '健身房課程預約系統 API',
      version: '1.0.0',
      description: '健身房課程預約系統的 API 文檔',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.get('web').port}`,
        description: '開發環境'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT 認證。請在登入後取得 token，並在此輸入'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'failed'
            },
            message: {
              type: 'string',
              example: '錯誤訊息'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: '張三'
            },
            email: {
              type: 'string',
              example: 'user@example.com'
            },
            role: {
              type: 'string',
              enum: ['USER', 'COACH'],
              example: 'USER'
            }
          }
        },
        Coach: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: '教練李四'
            },
            description: {
              type: 'string',
              example: '專業健身教練'
            },
            yearsOfExperience: {
              type: 'integer',
              example: 5
            },
            skills: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer'
                  },
                  name: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        Course: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: '瑜珈課程'
            },
            description: {
              type: 'string',
              example: '初級瑜珈課程'
            },
            startAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-01-28T10:00:00Z'
            },
            endAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-01-28T11:00:00Z'
            },
            creditCost: {
              type: 'integer',
              example: 1
            },
            maxStudents: {
              type: 'integer',
              example: 10
            },
            coach: {
              $ref: '#/components/schemas/Coach'
            }
          }
        },
        CreditPackage: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: '10堂課程包'
            },
            creditAmount: {
              type: 'integer',
              example: 10
            },
            price: {
              type: 'integer',
              example: 1000
            },
            expiryDays: {
              type: 'integer',
              example: 90
            }
          }
        },
        Skill: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: '瑜珈'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
