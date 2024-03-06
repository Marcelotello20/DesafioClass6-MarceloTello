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
    try {
        //Convertir a un numero el query param limit
        const limit = parseInt(req.query.limit);

        //Obteniendo productos
        const products = await PM.getProducts();

        //Si limit es un valor valido devuelve los productos si no devuelve los productos
        if (!isNaN(limit)) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products);
        }
    } catch(error) {
        console.error('Error al buscar los productos', error);
    }
})

app.listen(8080, () => console.log('Servidor Iniciado en el puerto 8080'));