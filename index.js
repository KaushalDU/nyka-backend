const express = require("express")
const {connection} = require("./db")
const { userRouter } = require("./routes/user.routes")
const { productRouter } = require("./routes/product.routes")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use("/api",productRouter)




app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to db");
        console.log("Server is running at port 8080");

    }catch(err){
         console.log(err);
    }
   
})