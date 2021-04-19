var request = require('request');
require("dotenv").config();

module.exports = {
    post: (data) => {
        console.log("_______________________________\n", data)
        var headers = {
            'Content-Type': 'application/json'
        };
        var options = {
            url: process.env.GAS_ADDRESS,
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
        console.log("-----request send------------");
        request(options, callback);
    }
}