const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/simple.sh',
    agent: false,
    headers:{
        'random-header': 'ignore'
    },
    }, (res) => {
        console.log (res.statusCode);
        console.log (res.statusMessage);
        util.compareHeaders({"content-type": "text/plain; charset=utf-8", "Content-length": "16"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "Packet received") {
                console.error("Wrong message");
            }
        });
});