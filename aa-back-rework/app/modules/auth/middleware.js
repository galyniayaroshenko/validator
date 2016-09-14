function authenticationMiddleware() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else { // TODO: remove else
      res.status(403).end();
    }
  }
}

module.exports = authenticationMiddleware;

// app.use(function (req, res, next) {
//   if (!req.session) {
//     return next(new Error('oh no')) // handle error 
//   }
//   next() // otherwise continue 
// })