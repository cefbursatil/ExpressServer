const Contenedor = require('./Contenedor.js')

const run = async function(){
    const Contenedor1 = new Contenedor('productos.json');

    let lista = await Contenedor1.getAll();
    console.log(lista);
    let lista2 = await Contenedor1.getRandom();
    console.log(lista2);
}
run();

