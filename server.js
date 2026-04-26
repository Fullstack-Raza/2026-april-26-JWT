require("dotenv").config()
const app = require("./src/app")
const connectTOdb = require("./src/config/database")

connectTOdb()

app.listen(3000,()=>{
    console.log("server is running on port 3000");  
})
