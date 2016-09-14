import mongoose from 'mongoose';

import { rules } from '../forms/register'

export let register = (req, res) => {

  let UserModel = mongoose.model('User');
  let user = new UserModel(req.body);

  console.log(req.body.trimMe);

  user.save(err => {
    // if (err) {
    //   res.body = {
    //     status: 'ERROR:general',
    //     data: err
    //   }
    //   res
    //     .status(200)
    //     .json(res.body);
    // } else {
    res.body = {
      status: 'OK'
    };
    res.json(res.body);
    // }
  });
};
