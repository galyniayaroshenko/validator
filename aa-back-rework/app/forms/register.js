export const rules = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid email'
    }
  },
  'firstName': {
    notEmpty: true,
    isLength: {
      options: [{ min: 2, max: 10 }],
      errorMessage: 'Must be between 2 and 10 chars long'
    },
    errorMessage: 'Invalid first name'
  },
  'lastName': {
    notEmpty: true,
    isLength: {
      options: [{ min: 2, max: 10 }],
      errorMessage: 'Must be between 2 and 10 chars long'
    },
    errorMessage: 'Invalid last name'
  },
  'birth': {
    notEmpty: true
  },
  'password': {
    notEmpty: true,
    errorMessage: 'Invalid password'
  },
  'passwordConfirm': {
    notEmpty: true,
    errorMessage: 'Invalid password confirm'
  }
}