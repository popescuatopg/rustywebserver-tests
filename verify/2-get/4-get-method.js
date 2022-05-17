
const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/print_method.sh',
    agent: false,
    headers:{},
    }, (res) => {
        console.log (res.statusCode);
        console.log (res.statusMessage);
        util.compareHeaders({"content-type": "text/plain"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "GET") {
                console.error("Wrong message");
            }
        });
});