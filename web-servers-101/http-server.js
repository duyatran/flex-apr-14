const http = require('http');
const port = 3000;
const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;

    // GET /about
    // GET /contact
    if (method === 'GET' && url === '/about') {
        response.statusCode = 200;
        response.end("You got to the about page");
    }
    // else if () {

    // }
    else {
        response.statusCode = 404;
        response.end("404 not found");
    }

})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
