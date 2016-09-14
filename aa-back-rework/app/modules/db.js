import mongoose from'mongoose';

import config from '../config.json';

mongoose.connect(config.dbUrl);
mongoose.connection
  .on('error', console.error.bind(console))
  .once('open', () => {
    console.log('Connected to:', config.dbUrl);
  });