const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/files/name.txt',
    agent: false,
    headers:{},
    }, (res) => {
        util.compareHeaders({"connection": "close", "content-type":"text/plain; charset=utf-8"}, res.headers);
        res.on ('data', (data) => {
            util.compareFile (util.filename("/files/name.txt"), data);
        })
});