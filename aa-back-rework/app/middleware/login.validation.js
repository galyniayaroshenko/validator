import { rules } from '../forms/login'

export let loginValidation = (req, res, next) => {

  // TODO: move to auth middleware
  /* let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    res.body = {
      status: 'ERROR:general',
      data: 'Token already provided'
    };
    return res.json(res.body);
  } */

  req.checkBody(rules);
  let errors = req.validationErrors();

  if (errors) {
    let errorsList = {};

    errors.forEach((error) => {
      errorsList[error.param] = error.msg;
    });

    res.body = {
      status: 'ERROR:target',
      data: errorsList
    }
    return res
      .status(200)
      .json(res.body);
  }
  else {
    next();
  }
};
