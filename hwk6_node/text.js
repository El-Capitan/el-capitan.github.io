var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    fs.readFile('content.txt', function(err, data) {
        if (err) {
            console.log('There seems to have been an issue');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        var array = data.toString().split("\n");
        for (i in array) {
            res.write(array[i] + "<br />");
        };
        res.end();
    });
}).listen(8000);
console.log('Serving content.txt on Port 8000');