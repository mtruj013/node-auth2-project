const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(express.json());

const authRouter = require("./auth/auth-router.js")
const userRouter = require("./users/users-router.js")

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)

module.exports = server;
