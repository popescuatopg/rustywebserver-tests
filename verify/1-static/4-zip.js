const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/archive.zip',
    agent: false,
    headers:{},
    }, (res) => {
        util.compareHeaders({"connection": "close", "content-type":"application/zip"}, res.headers);
        res.on ('data', (data) => {
            util.compareFile (util.filename("/archive.zip"), data);
        })
});
