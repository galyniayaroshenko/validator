import expressValidator from 'express-validator';
// import passport from 'passport';

import { customValidators } from '../forms/custom';

import { loggerMiddleware } from '../middleware/logger';
import { authMiddleware } from '../middleware/auth';
import { loginValidation } from '../middleware/login.validation';
import { registerValidation } from '../middleware/register.validation';

import { users } from './users';
import { auth } from './auth';
import { register } from './register';

import { db } from '../modules/db';


export function routes(app) {

  app
    .use(expressValidator(customValidators))
    .use(loggerMiddleware)
    .post('/api/register', registerValidation, register)
    .post('/api/login', loginValidation, auth.login)
    .post('/api/logout', auth.logout)
    .get('/api/users', authMiddleware, users.get);

  // -----------------------------------------
  // app.get('/api/users1', passport.authenticationMiddleware(), users.get);
  // app.post('/api/login1', passport.authenticate('local', {
  //   successRedirect: '/success',
  //   failureRedirect: '/fail'
  // }))

  app.get('/success', (req, res, next) => {
    res.body = {
      status: 'OK'
    };
    return res.json(res.body);
  });

  app.get('/fail', (req, res, next) => {
    res.body = {
      status: 'FAIL'
    };
    return res.json(res.body);
  });

  // app.get('/api/logout1', (req, res) => {
  //   // TODO: delete from Redis
  //   req.logout();
  //   res.redirect('/success');
  // });
}

/**
 * TODO: error handler
 */