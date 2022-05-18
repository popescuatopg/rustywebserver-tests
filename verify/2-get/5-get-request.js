
const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/print_method.sh',
    agent: false,
    headers:{},
    }, (res) => {
        let correct = true;
        correct = correct & util.compareStatus(res, 200, "OK");
        correct = correct & util.compareHeaders({"content-type": "text/plain"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "GET") {
                console.error("Wrong message");
            }
            else
            {
                correct = false;
            }
        });
        res.on("end", () => {
            if (!correct) {
                process.exit(1);
            }
        });
});