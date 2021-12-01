const express = require("express")
const handlebars = require("express-handlebars")
const {Router} =express
const Contenedor = require('./Contenedor.js')
const app = express();
const router=Router();
const methodOverride = require('method-override');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.engine(
  "hbs",
  handlebars.engine({
      extname: ".hbs",
      partialsDir: __dirname + "/views/partials"
  })
)
app.set("view engine", "hbs")
app.set("views", "./views")
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3000
const Contenedor1 = new Contenedor(__dirname + "/data/libros.json");


router.get('/',async(request,response,next) => {
    try {
      console.log("API productos")
        const lista = await Contenedor1.getAll();
        console.log(lista)
        response.send(lista)
      }
      catch(error) {
        return next(error);
      }

})
router.get('/:id',async(request,response,next) => {
  try {
    let id = request.params.id
    const itemrandom = await Contenedor1.getById(id);
      console.log(itemrandom)
      response.send(itemrandom)
    }
    catch(error) {
      return next(error);
    }
  })
router.post('/',async(request,response,next) => {
try {
  let obj =request.body
  console.log("POST")
  console.log(obj)
  await Contenedor1.save(obj);
  request.method = 'GET'
    response.redirect('/')
  }
  catch(error) {
    return next(error);
  }
})
router.put('/:id',async(request,response,next) => {
try {
  let obj =request.body
  let id = req.params.id
  console.log("PUT")
  console.log(obj)
  const itemrandom = await Contenedor1.update(id,obj);
  
    response.send(itemrandom)
  }
  catch(error) {
    return next(error);
  }
})
router.delete('/:id',async(request,response,next) => {
  try {
    let id = request.params.id
    console.log("DELETE")
    console.log(id)
    const itemrandom = await Contenedor1.deleteById(id);
    request.method = 'GET'
    response.redirect('/')
    }
    catch(error) {
      return next(error);
    }
  })


router.get('/Random',async(request,response) => {
try {
  const itemrandom = await Contenedor1.getAll();
    console.log(itemrandom)
    response.send(itemrandom)
  }
  catch(error) {
    return next(error);
  }
})
app.use("/api/productos", router)

app.get("/", (req, res) => {
  console.log("REQUEST TEMPLATE")
  res.render("home", {
      list: Contenedor1.array, showList: true
  })
})
const server = app.listen(PORT, () => {
  console.log(`servidor corriendo en el ${PORT}`)
})
server.on("error",(error) =>{

    console.log("hubo un error en el servidor")
})

