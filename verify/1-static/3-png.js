const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/summertime.png',
    agent: false,
    headers:{},
    }, (res) => {
        util.compareHeaders({"connection": "close", "content-type":"image/png"}, res.headers);
        res.on ('data', (data) => {
            util.compareFile (util.filename("/summertime.png"), data);
        })
});
