import http from 'http';


const server = http.createServer((req, res) => {
    res.end("Welcome to Employee Task Management");
});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
