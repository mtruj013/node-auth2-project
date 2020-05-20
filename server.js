const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const authRouter = require("./auth/auth-router.js")
const userRouter = require("./users/users-router.js")

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)

module.exports = server;
