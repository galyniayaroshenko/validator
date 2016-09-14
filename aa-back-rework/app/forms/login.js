export const rules = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Empty email'
    }
  },
  'password': {
    notEmpty: true,
    errorMessage: 'Empty password'
  }
}