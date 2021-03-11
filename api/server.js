
const express = require('express')

const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.static(path.join(dirname, 'client/build')))
// remember express by default cannot parse JSON in request bodies

server.use(express.json());
server.use(logger);

// global middlewares and the user's router need to be connected here
const userRouter = require('./users/users-router')


server.use('/api/users/', userRouter)



server.get("/", (req, res) => {
  res.send(`working?`);
});



module.exports = server;
