import mongoose from 'mongoose';

import '../models/User';

export const customValidators = {
  customValidators: {
    isAbleBodied: (age) => {
      return age >= 18 && age <= 65;
    }/*,
    isEmailAvailable: (email) => {
      if (!email) {
        return true;
      }
      console.log('=========================== Email:', email);
      let User = mongoose.model('User');
      // console.log(User.findOne({ email: email }));

      return new Promise((resolve, reject) => {
        // let User = mongoose.model('User');
        User.findOne({ email: email })
          .then((user) => {
            debugger;
            console.log('THEN');
            if (user) {
              resolve(user);
            }
            else {
              console.log('Reject');
              reject(user);
            }
          })
          .catch((error) => {
            console.log('CATCH');
            if (error) {
              reject(error);
            }
          });
      });
    }*/
  }/*,
  errorFormatter: (param, msg) => {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;

    console.log(namespace, root, formParam);

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg
    };
  }*/
}