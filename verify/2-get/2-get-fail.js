const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/fail.sh',
    agent: false,
    headers:{
        msg: 'super message',
        usr: 'a super student'
    },
    }, (res) => {
        let correct = true;
        correct = correct & util.compareStatus(res, 500, "Internal Server Error");
        correct = correct & util.compareHeaders({"connection": "close"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "<html>500 Internal Server Error</html>") {
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