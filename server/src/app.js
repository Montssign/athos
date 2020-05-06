import path from 'path'
import express from 'express'
import routes from './routes'

import './database'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes(){
		this.server.use(express.static(path.resolve(__dirname, '..', 'public')))
		this.server.use('/api', routes)
		this.server.use('/api', () => {throw new Error()})
		this.server.use('*.json', (req, res) => res.sendFile(path.resolve(__dirname, '..', path.join('public', req.baseUrl))))
		this.server.use('*', express.static(path.resolve(__dirname, '..', 'public', 'index.html')))
  }
}

export default new App().server
