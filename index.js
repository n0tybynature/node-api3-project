// require your server and launch it
const server = require('./api/server.js')

server.listen(4000, () => {
    console.log('Server working on port 4000');
});