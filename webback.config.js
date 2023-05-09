import Dotenv from 'dotenv-webpack';
import path from 'path';

export default env => config => {
    const Dotenv = require('dotenv-webpack');

    module.exports = {

      plugins: [
        new Dotenv()
      ]
   
    };

  return config;
};