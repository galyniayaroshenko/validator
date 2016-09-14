import { jwtToken } from  '../modules/jwtToken';
import { MemoryStore } from '../modules/memoryStore';

export let authMiddleware = (req, res, next) => {

  const userToken = req.headers['x-access-token'];

  if (userToken) {
    MemoryStore.exists(userToken)
      .then(
      result => {
        if (result) {
          MemoryStore.updateExpire(userToken);
          next();
        } else {
          res.status(403).end();
        }
      })
      .catch(error => {
        res.body = {
          status: 'ERROR:general',
          data: error
        };
        // TODO: add correct status code
        res.status(404).send(error);
      })
  } else {
    res.status(403).end();
  }
};
