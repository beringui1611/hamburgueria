const express = require ("express")
const uuid = require("uuid")


const port = 3000
const app = express()
app.use(express.json())

const order = []
let statusNotReady = "em preparação"
let statusReady = "pronto"
    


app.get("/order", (request, response)=>{
  
   return response.json(order)

})




app.post("/order", (request, response)=> {
    const {pedidos,clientName, price } = request.body
    
    const orders = { id:uuid.v4(),pedidos, clientName, price, statusNotReady }

order.push(orders)

  
    return response.status(201).json(order)
 
 })


 app.put("/order/:id", (request, response)=>{
    const {id} = request.params
    const {pedidos, clientName, price}= request.body

    const updateOrder = { id, clientName, pedidos, price }

    const index = order.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({message:"order not found"})

    }

    order[index] = updateOrder



    return response.json(updateOrder)
 
})


app.patch("/order/:id", (request, response)=> {
   
  const {pedidos, clientName, price} = request.body

  const status = {pedidos, clientName, price, statusReady }


 order.push(status)

    return response.status(201).json(order)


 
 })

 app.delete("/order/:id", (request, response) =>{

    const {id} = request.params
    
    const index = order.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({message:"order not found"})

    }

    order.splice(index,1)

    return response.status(204).json()

 })


 
 app.get("/order/:id", (request, response)=>{
  
    return response.json(order)
 
 })








































app.listen(port,() =>{
console.log(`🚀started server on port ${port}`)
})