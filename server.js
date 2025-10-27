require('dotenv');
const express = require('express')
require('./config/database')
const PORT = process.env.PORT || 5677
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
const clientRouter = require('./router/clientRouter');
const adminRouter = require('./router/adminRouter')
const generalRouter = require('./router/general')
const venueRouter  = require('./router/venueRouter')
const venueOwnerRouter  = require('./router/venueOwnerRouter')
const venuebookingRouter =  require('./router/venuebookingRouter')

app.use('/api/v1/', clientRouter)
app.use('/api/v1/',adminRouter)
app.use('/api/v1/',generalRouter)
app.use('/api/v1/',venueRouter)
app.use('/api/v1/',venueOwnerRouter)
app.use('/api/v1/',venuebookingRouter)

app.use((error, req, res, next) => {
  if (error) {
     return res.status(error.status || 500).json(error.message || 'Something went wrong')
  }
 next()
})

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation for our mini project',
    version: '1.0.0',
    description: 'First swagger documentation class.',
    // license: {
    //   name: 'Licensed Under MIT',
    //   url: 'https://spdx.org/licenses/MIT.html',
    // },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://google.com',
    },
  },
  servers: [
    {
      url: 'http://localhost: 9000',
      description: 'Development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./router/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  console.log(`My server is running on port:${PORT}`)
})
