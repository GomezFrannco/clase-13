import express from 'express';
import dotenv from 'dotenv'
import path from 'path'
import session from 'express-session';
import passport from './utils/passport.utils.js'
import { engine } from 'express-handlebars'
import authRoutes from './routes/auth.routes.js'
import './config/mongoose.config.js'

export class App {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.dotenv = dotenv.config();
    this.settings();
    this.middlewares();
    this.routes();
  }
  settings() {
    this.app.set('port', this.port || process.env.PORT);
    this.app.set("views", "./src/views");
    this.app.set("view engine", "hbs");
    this.app.engine('hbs', engine({
      extname: "hbs",
      defaultLayout: "main.hbs",
      layoutsDir: path.resolve() + "/src/views/layouts",
    }))
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.use(session({
      secret: process.env.SECRET,
      cookie:{
        maxAge: 60000,
      },
      rolling: true, 
      resave: true,
      saveUninitialized: true,
    }))
    this.app.use(passport.session());
  }
  routes() {
    this.app.use('/', authRoutes)
  }
  listen() {
    this.app.listen(this.app.get('port'), () => {
      console.log('🚀 listening on port:', Number(this.app.get('port')));
    });
  }
}