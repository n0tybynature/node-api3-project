// require your server and launch it
require('dotenv').config()
const path = require('path')
const server = express()

server.use(express.json())

server.use(express.static(path.json(__dirname,"cilent/build")))


console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV === "development"){
    const cors = require('cors')
    server.use(cors())
}


  


server.get("*", (req,res) => {
    res.sendFile(path.join(dirname, "client/build", "index.html"))
  })
  
  const PORT = process.env.Port || 5000


server.listen(5000, () => {
    console.log('Server working on port 4000');
});