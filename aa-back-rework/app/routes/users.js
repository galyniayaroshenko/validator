import mongoose from 'mongoose';

import '../models/User';

let UserModel = mongoose.model('User');

export let users = {
  get: (req, res, next) => {
    let promise = new Promise((resolve, reject) => {
      UserModel.find({}, (err, users) => {
        resolve(users)
      });
    }).then(
      result => {
        res.body = {
          status: 'OK',
          data: result
        };
        return res.json(res.body);
      })
      .catch(error => {
        res.body = {
          status: 'ERROR:genearl',
          data: error
        };
        return res.json(res.body);
      });
  }
}