import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';
import nconf from 'nconf';
import morgan from 'morgan';

// import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';

import config from './app/config.json';
import { routes } from './app/routes/';
// import auth from './app/modules/auth';

const app = express();
const RedisStore = connectRedis(session);

nconf.argv()
  .env()
  .file({ file: './app/config.json' });

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    host: config.redis.url,
    port: config.redis.port
  }),
  secret: config.redis.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.cookie.maxAge
  }
}))

routes(app);

app.listen(nconf.get('port'));
console.log('Listening to port:', nconf.get('port'));

console.log('-------------------------------------');
import { FormValidator } from './app/modules/validator';

var data = {
  num: 23,
  str: '',
  name: 'asd',
  obj: {
    num: 1,
    str: 'abc',
  }
}

let fv;

if (!fv) {
  fv  = new FormValidator();

  fv.field('nuwm').required().type(Number).testAsync();
  fv.field('str').required().type(Number);
  fv.field('name').required().type(String);
}

fv.validate(data)
  .then(result => {
    console.log('Result: ', result);
  })
  .catch(error => {
    console.log(error);
  });

// fv.formatErrors();

// fv.validate(fields)
//   .then(function(validationError) {
//     if (validationError) {
//       req.status(200)

//     } else {
//       next();
//     }
//   })
//   .catch(function(message) {
//     req.status(400).send(message);
//   })

console.log('-------------------------------------');