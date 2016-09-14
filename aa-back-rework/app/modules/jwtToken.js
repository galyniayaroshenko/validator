import jwt from 'jsonwebtoken';

import config from '../config.json';

export let jwtToken = {

  sign(user) {
    return jwt.sign(user, config.secret, {
      expiresIn: 86400 // 60 * 60 * 24
    });
  },

  verify(token) {
    let decoded = false;

    try {
      decoded = jwt.verify(token, config.secret);
    } catch (err) {
      console.log(err);
    }
    return decoded;
  }
}
