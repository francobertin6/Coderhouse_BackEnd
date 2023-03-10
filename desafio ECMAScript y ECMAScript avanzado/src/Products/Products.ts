
import express from "express";
import * as fs from "fs";
import ProductManager from "../api/productManager";


const products = express.Router();
products.use(express.json())

interface product{
    id?:number;
    title:string;
    description:string;
    price:number;
    thumbnail:string[];
    code:string;
    stock:number;
    status:boolean
}


// llamo a productos.json para traer los productos gaurdados
const productosJson:any = () => {
    
    let exists =  fs.existsSync("./files/productos.json.txt")

    if(exists === true){

        return JSON.parse(fs.readFileSync("./files/productos.json.txt", "utf-8"));

    }
    else{

        return undefined

    }

}    

// funcion que verifica si existe el archivo
const ProductsData = () : product[] => {

    console.log(productosJson());

    if(productosJson() === undefined){
        return [];
    }
    else{
        return productosJson();
    }

}

// funcion que devuelve el numero de id que tendra la clase
const GetId = () : number => {

    if(productosJson() === undefined){
        return 0
    }
    else{
        return productosJson().length;
    }
}


const mercaderia = new ProductManager(ProductsData(), GetId());

products.post("/addProduct", (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.thumbnail || !req.body.code || !req.body.stock || !req.body.status) {
        res.status(404).send("te faltan paramentros");
    }
    else {
        res.status(200).send("el producto se agrego satisfactoriamente");
        mercaderia.addProduct(req.body);
    }
});

products.get("/", (req, res) => {

    let limit = Number(req.query.limit);
    let id = Number(req.query.id);

    console.log(id, limit)

    if(!limit && !id){
        res.status(200).send(mercaderia.getAllProducts());
    }
    else if(id){
        res.status(200).send(mercaderia.getProduct(id));
    }
    else{
        res.status(200).send(mercaderia.getLimitedProducts(limit));
    }

})

products.put('/changeProduct/:id', (req, res) => {

    if(!req.body){

        res.status(404).send("no se han generado cambios por falta de informacion");
    }
    else{

        let id = Number(req.params.id);

        let producto = mercaderia.getProduct(id);

        let newProducto = {...producto, ...req.body};

        mercaderia.updateProduct(id, newProducto)

        res.status(200).send("los cambios se han ejecutado")
    }

})

products.delete('/deleteProduct/:id', (req, res) => {

    let id = Number(req.params.id);

    mercaderia.deleteProduct(id);

    res.status(200).send("el producto ha sido borrado");
})

export default products