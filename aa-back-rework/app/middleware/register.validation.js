import mongoose from 'mongoose';

import { rules } from '../forms/register'

export let registerValidation = (req, res, next) => {

  // req.checkBody(rules);
  // req.checkBody('email', 'User with email already exists').isEmailAvailable();
  console.time('checkBody');
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('firstName', 'Invalid first name').isInt().withMessage('Not integer').len(4, 20).contains('Mr').isAlphanumeric().withMessage('Contains non alpha');
  req.checkBody('lastName', 'Invalid last name').optional().len(4, 20);
  req.checkBody('birth', 'Invalid date').isDate();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('passwordConfirm', 'Passwords do not match').notEmpty().withMessage('Invalid password confirm').matches(req.body.password);
  req.checkBody('age', 'Invalid age').isInt().isAbleBodied();
  req.checkBody('color', 'Invalid color').isIn(['R', 'G', 'B']);
  req.checkBody('money', 'Invalid money').isCurrency({ allow_negatives: false, require_symbol: true });
  req.sanitize('trimMe').trim();
  console.timeEnd('checkBody');

  console.log(req.body);


  //  var formForFieldcredits = requrie('formForFieldcredits');


  // var form = new Form();

  // form.field('credits').requried().type(Object).useForm(formForFieldcreditsy)

  console.time('asyncValidationErrors');
  req.asyncValidationErrors()
    .then(() => {
      console.timeEnd('asyncValidationErrors');
      next();
    })
    .catch(errors => {
      let errorsList = {};

      errors.forEach((error) => {
        if (!errorsList[error.param]) {
          errorsList[error.param] = [];
        }
        errorsList[error.param].push(error.msg);
      });
      console.timeEnd('asyncValidationErrors');

      res.body = {
        status: 'ERROR:target',
        data: errors,
        dataFormatted: errorsList,
      }
      return res
        .status(200)
        .json(res.body);
    });
};
