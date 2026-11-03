import http from 'http';
import fs from 'fs';

// Array to store employee tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending"
    },
    {
        id: 2,
        taskName: "Design Dashboard",
        assignedTo: "Amit Kumar",
        status: "In Progress"
    },
    {
        id: 3,
        taskName: "Test Application",
        assignedTo: "Priya Singh",
        status: "Completed"
    }
];

// Create HTTP server
const server = http.createServer((req, res) => {

    // A2: Routing

    // Route: /
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Employee Task Management</h1>");
    }

    // Route: /tasks
    else if (req.url === "/tasks" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(tasks));
    }

    // Route: /about
    else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Employee Task Management Application");
    }

    // Route: /home
    else if (req.url === "/home" && req.method === "GET") {
        fs.readFile("./public/index.html", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading HTML file");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }

    // A3: POST /add-task
    else if (req.url === "/add-task" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {
                const newTask = JSON.parse(body);

                // Validate required fields
                if (
                    newTask.id === undefined ||
                    !newTask.taskName ||
                    !newTask.assignedTo ||
                    !newTask.status
                ) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "All required fields must be provided"
                    }));

                    return;
                }

                // Add task to array
                tasks.push(newTask);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Task added successfully",
                    task: newTask
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON format"
                }));
            }
        });
    }

    // A5: Invalid routes
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Route Not Found");
    }
});

// Start server on port 3000
server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
