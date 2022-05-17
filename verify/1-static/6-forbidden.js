const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/forbidden.html',
    agent: false,
    headers:{},
    }, (res) => {
        util.compareHeaders({"connection": "close"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "<html>404 Not Found</html>") {
                console.error("Wrong message");
            }
        })
});