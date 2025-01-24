const http = require('http');

const port = 3000; // Choose your port number



const server = http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.end('Hello World!');

});



server.listen(port, () => {

    console.log(`Server listening on port ${port}`);

});
