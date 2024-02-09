// require('dotenv').config
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path:'./env'
})

connectDB()

.then(() => {

    app.on(('error', (error) => {
        console.log(`error: ${error}`)
    }))
    app.listen(process.env.PORT , () => {
        console.log(`server is listing on port ${process.env.PORT}`)
    })
})
  
.catch((err) => {
    console.log("this is mongodb error :" , err)
})



// first approch
// import express from 'express';

// const app = express()

// // IIFE
// ( async () => {
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error", (error) =>{
//         console.log("error:", error);
//         throw error
//        })
//        app.listen(process.env.PORT, ()=>{
//         console.log(`app is listing on port ${process.env.PORT}` )
//        })
//     }catch(error){
//         console.error("error:" , error)
//         throw err
//     }
// })()()