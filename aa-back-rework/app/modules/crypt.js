import crypto from 'crypto';

export let crypt = {
  cryptPassword: (password) => crypto.createHash('sha256').update(password).digest('hex')
};