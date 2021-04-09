const express = require("express");
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const { logger } = require("./global-middleware");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;
