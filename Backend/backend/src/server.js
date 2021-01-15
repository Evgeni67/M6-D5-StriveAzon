const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { join } = require("path");
const projectsRoutes = require("./services/projects");
const productsRoutes = require("./services/projects/products");
const reviewsRoutes = require("./services/projects/reviews");
const server = express();
const port = process.env.PORT || 3002;
//we are sharing public folder publicly to access
const publicFolderPath = join(__dirname, "../public");
// we are sharing public folder under upload
server.use("/uploads", express.static(publicFolderPath));
server.use(cors());
server.use(express.json()); // I need to specify this line of code otherwise all the request bodies will be undefined. And this line of code must come BEFORE the routes
const loggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
  next();
};
server.use("/projects", projectsRoutes);
server.use("/products", productsRoutes);
server.use("/reviews", reviewsRoutes);
server.use("/files", require("./services/files"));
server.use(loggerMiddleware);


mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Server is running on port: ", port);
    })
  );
