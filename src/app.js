const ProductManager = require('./components/ProductManager/ProductManager');
const express = require('express')

const app = express();
const PM = new ProductManager(`${__dirname}/Productos.json`)

//Endpoint principal
app.get('/', (req, res) => {
    res.send('¡Hola este es el desafio de la clase 6');
});

//Endpoint para buscar los productos
app.get('/products', async (req, res) => {
    // Param limit
    const {limit} = req.query;

    //Obteniendo productos
    let products = await PM.getProducts();

    //Si limit existe , se aplica slice para obtener la cantidad de productos
    if (limit) {
        products = products.slice(0, limit);
    } 
    
    //Devuelve el let products
    res.send(products);
})

// Endpoint con el productId para buscar uno especifico 
app.get('/products/:id', async (req,res) => {
    //Obteniendo el productId del param y con "+" para transformarlo a numero
    const productId = +req.params.id;

    //getProductiById usando el param
    let product = await PM.getProductById(productId)

    //Devolver el producto si se encontro , si no devolver un error y un res.send
    if (!product) {
        console.error("No se encontro el producto solicitado");
        return res.send({
            error: `No se encontró el producto con ID ${productId}`
        });
    } 
    
    res.send({product})   
})

app.listen(8080, () => console.log('Servidor Iniciado en el puerto 8080'));