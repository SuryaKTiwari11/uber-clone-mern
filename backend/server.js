const http = require("http");
const app = require("./app");
const port = process.env.PORT || 4000;
const server = http.createServer(app);

import userRoutes from "./routes/user.routes.js";

app.use("/users", userRoutes);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
