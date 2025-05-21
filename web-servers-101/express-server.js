const express = require("express");
const morgan = require("morgan");
const app = express(); // http.createServer/net.createServer
const port = 4000;

// middleware
const morganMiddleware = morgan("dev");
app.use(morganMiddleware);

app.use((req, res, next) => {
    req.secretKey = "good day";
    console.log(`Incoming request: ${req.method} ${req.url}`);
    // this middleware has done its logic, go to the next middleware (or the route)
    next();
});

// Set up routes (handlers of HTTP method + path)

// http://localhost/
// GET /
// Sending a static HTML file
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

// Next: Send a dynamically rendered HTML file (file with actual user-specific data)
// Set up some HTML template + add some data to it
// Templating engines

// GET /about
app.get("/about", (req, res) => {
    console.log(`Secret key: ${req.secretKey}`); // "good day"
    res.status(200);
    res.end("You got to the about page");
})

// Catch-all. Note in express 5, we need to say *splat instead of *
app.get("/*splat", (req, res) => {
    res.status(404);
    res.end("404 not found")
});

app.listen(port, () => {
    console.log(`Express app is listening on port ${port}`);
});
