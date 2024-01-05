const express = require("express")
const {ProductModel} = require("../models/product.model")
const jwt = require("jsonwebtoken")
const { auth } = require("../middleware/auth.middleware")

const productRouter = express.Router()


//restricted Routes

productRouter.post("/products",auth,async(req,res)=>{
      try{
        const product = new ProductModel(req.body)
        await product.save()
        res.status(200).send({"msg":"New product has been added"})

      }catch(err){
        res.status(400).send({"error":err})

      }
})

productRouter.get("/products",auth,async(req,res)=>{
     try{
        const products = await ProductModel.find()
        res.status(200).send(products)

     }catch(err){
        res.status(400).send({"error":err})
     }
})

productRouter.patch("/products/:id",auth,async(req,res)=>{
    const {id} = req.params
    try{
        await ProductModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":`Product with ID:${id} has been updated`})

    }catch(err){
       res.status(400).send({"error":err})
    }
})

productRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id} = req.params
    try{
        await ProductModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Product with ID:${id} has been deleted`})

    }catch(err){
       res.status(400).send({"error":err})
    }
})



module.exports = {
    productRouter
}