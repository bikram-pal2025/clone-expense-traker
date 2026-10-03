
require("dotenv").config();

const app = require("./src/app");
const connectDb = require("./src/db/db");


connectDb()




const port = process.env.PORT ;

app.listen(port ,()=>{

    console.log("server is running on port",port);

})