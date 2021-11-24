const express = require("express")
const Contenedor = require('./Contenedor.js')
const app = express()
const PORT = process.env.PORT || 3000
const Contenedor1 = new Contenedor('productos.json');
const server = app.listen(PORT, () => {
    console.log(`servidor corriendo en el ${PORT}`)
})
server.on("error",(error) =>{
    console.log("hubo un error en el servidor")
})

app.get('/productos',async(request,response,next) => {
    try {
        const lista = await Contenedor1.getAll();
        console.log(lista)
        response.send(lista)
      }
      catch(error) {
        return next(error);
      }

})
app.get('/productoRandom',async(request,response) => {
    try {
      const itemrandom = await Contenedor1.getRandom();
        console.log(itemrandom)
        response.send(itemrandom)
      }
      catch(error) {
        return next(error);
      }

})