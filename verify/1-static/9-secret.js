const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/../verify/2-get/2-get-fail.js',
    agent: false,
    headers:{},
    }, (res) => {
        let correct = true;
        correct = correct & util.compareStatus(res, 403, "Forbidden");
        correct = correct & util.compareHeaders({"connection": "close"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "<html>403 Not Found</html>") {
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