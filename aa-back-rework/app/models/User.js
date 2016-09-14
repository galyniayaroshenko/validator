import mongoose from 'mongoose';

import { crypt } from '../modules/crypt';

export let userSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  birth: { type: String, default: '' },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
    default: null
  },
  password: { type: String, default: null, set: crypt.cryptPassword },
}, {
    collection: 'users',
    _id: true,
    versionKey: false
  });

// userSchema.statics.findByEmail = (email, cb) => {
//   return mongoose.model('User', userSchema).findOne({ email }, cb);
// };

userSchema.statics.findByEmailAndPassword = (email, password, cb) => {
  let passwordCrypt = crypt.cryptPassword(password);

  return new Promise((resolve, reject) => {
    mongoose.model('User', userSchema).findOne({ email, password: passwordCrypt }, (err, user) => {
      resolve(user)
    });
  })  
};

mongoose.model('User', userSchema);
