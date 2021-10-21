const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config')

class Server {
  


  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8000
    // this.paths = {
    //   auth: '/api/auth',
    //   users: '/api/users',
    //   categories: '/api/categories',
    //   products: '/api/products'
    // }
    
    

    // Database
    this.connectDb();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes()
  }

  async connectDb() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())
    // body reading and parsing
    this.app.use(express.json())
    // Static public files
    this.app.use(express.static('public'))
    // File upload handling
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }))
  }

  routes() {
    this.app.use('/api', require('../routes/index.route'));
    // this.app.use(this.paths.auth, require('../routes/auth.route'))
    // this.app.use(this.paths.users, require('../routes/user.route'))
    // this.app.use(this.paths.categories, require('../routes/category.route'))
    // this.app.use(this.paths.products, require('../routes/product.route'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening ${this.port}`)
    })
  }
}

module.exports = Server;