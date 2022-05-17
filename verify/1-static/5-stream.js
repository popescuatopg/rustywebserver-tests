const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/cloudy',
    agent: false,
    headers:{},
    }, (res) => {
        console.log (res.statusCode);
        console.log (res.statusMessage);
        util.compareHeaders({"connection": "close", "content-type":"application/octet-stream"}, res.headers);
        res.on ('data', (data) => {
            util.compareFile (util.filename("/cloudy"), data);
        })
});
