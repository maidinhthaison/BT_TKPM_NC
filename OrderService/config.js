import dotenv from 'dotenv';
import assert from 'assert'; 
dotenv.config();

const {PORT, HOST, HOST_URL,  ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN
} = process.env;

assert(PORT, 'Port is require');
assert(HOST, 'Host is require');

export const config  = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    accessTokenSecret: ACCESS_TOKEN_SECRET,
    refreshTokenSecret: REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN
}
