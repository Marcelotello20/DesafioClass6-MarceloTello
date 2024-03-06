const ProductManager = require('./components/ProductManager/ProductManager');
const express = require('express')

const PM = new ProductManager(`${__dirname}/Productos.json`)


const app = async () => {
    //Utilizando addProduct
    await PM.addProduct({

        title: "producto prueba",
        description:"Este es un producto prueba",
        price:200,
        thumbnail:"Sin imagen",
        code:"abc123",
        stock:25,

    });
    
    //Code sin repetir y su comprobacion
    await PM.addProduct({

        title: "producto prueba",
        description:"Este es un producto prueba",
        price:200,
        thumbnail:"Sin imagen",
        code:"abc123",
        stock:25,

    });

    //Comprobando getProductById
    console.log("[PRODUCTOS FILTRADO]",await PM.getProductById(1));
    
    //Utilizando y comprobando updateProduct
    await PM.updateProduct(2,{ code:"dfg123" })
    console.log("[PRODUCTOS ACTUALIZADOS]",await PM.getProducts());

    //Utilizando deleteProduct y comprobando su eliminacion
    await PM.deleteProduct(2);
    console.log("[PRODUCTOS ACTUALIZADOS]",await PM.getProducts());

}

app();