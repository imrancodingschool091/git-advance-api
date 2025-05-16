import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./src/config/db.js"
import productRoutes from "./src/routes/product.routes.js"



const app=express()
dotenv.config()

connectDb()

app.use(cors())
app.use(express.json())
app.use("/api/products",productRoutes)



const port=process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`the app is running on port:${port}`);
})


