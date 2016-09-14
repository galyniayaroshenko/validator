import mongoose from 'mongoose';
import { userSchema } from '../../models/User';

import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

let User = mongoose.model('User', userSchema);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

function initPassport() {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
      //passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (email, password, done) => {
      User.findByEmailAndPassword(email, password)
        .then(user => {
          if (!user) {
            console.log('Invalid user or password');
            return done(null, false)
          }
          return done(null, user)

        })
        .catch(error => {
          return console.log('ERROR:', error);
        });
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
