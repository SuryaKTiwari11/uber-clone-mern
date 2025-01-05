const http = require("http");
//we access the http module and store it in a variable called http
const app = require("./app");
//we access the app module and store it in a variable called app
const port = process.env.PORT || 3000;
//we access the PORT key in the process.env object and store it in a variable called port.
const server = http.createServer(app);
//we call the createServer method on our http object and pass it the app object.
//The createServer method returns a new instance of a http.Server object.
//We store this object in a variable called server.

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
