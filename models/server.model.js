const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server {
  


  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8000
    this.userPath = '/api/users'
    this.authPath = '/api/auth'

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
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.route'))
    this.app.use(this.userPath, require('../routes/user.route'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening ${this.port}`)
    })
  }
}

module.exports = Server;