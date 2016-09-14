import mongoose from 'mongoose';

import { jwtToken } from  '../modules/jwtToken';
import { MemoryStore } from '../modules/memoryStore';
import { userSchema } from '../models/User';

export let auth = {
  login: (req, res, next) => {
    let User = mongoose.model('User', userSchema);

    User.findByEmailAndPassword(req.body.email, req.body.password)
      .then(user => {
        if (user) {
          const authToken = jwtToken.sign(user);
          const value = JSON.stringify(user);

          MemoryStore.set(authToken, value);
          res.body = {
            status: 'OK',
            data: {
              authToken: authToken
            }
          };
        } else {
          res.body = {
            status: 'ERROR:general',
            data: 'Invalid user or password'
          };
        }
        return res.json(res.body);

      })
      .catch(error => {
        return console.log('ERROR:', error);
      });
  },

  logout: (req, res, next) => {
    MemoryStore.delete('token');
    res.body = {
      status: 'OK'
    };
    return res.json(res.body);

  }

};
