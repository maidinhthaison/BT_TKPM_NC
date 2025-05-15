import dotenv from 'dotenv';
import assert from 'assert'; 
dotenv.config();


const {PORT, HOST, HOST_URL
} = process.env;

assert(PORT, 'Port is require');
assert(HOST, 'Host is require');

export const config  = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
}
