const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

require('module-alias/register');
require('module-alias').addAlias('@', path.join(__dirname, 'src'));
