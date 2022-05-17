const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/plain.txt',
    agent: false,
    headers: {},
    }, (res) => {
        util.compareHeaders({"connection": "close", "content-type":"text/plain; charset=utf-8"}, res.headers);
        res.on("data", (data) => {
            util.compareFile (util.filename("/plain.txt"), data);
        });
        // res.on ('data', (data) => {
        //     console.log (data.toString ('utf-8'));
        // })
});
