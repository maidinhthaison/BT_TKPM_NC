const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL} = process.env;

assert(PORT, 'Port is require');
assert(HOST, 'Host is require');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL
}