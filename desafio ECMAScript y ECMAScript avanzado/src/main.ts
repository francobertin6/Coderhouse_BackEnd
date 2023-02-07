
import express from "express";


const products = express.Router();
products.use(express.json())


interface product{
    id?:number;
    title:string;
    description:string;
    price:number;
    thumbnail:string;
    code:string;
    stock:number
}


class ProductManager{

    Products: product[];
    id : number;

    constructor(){
        this.Products = [];
        this.id = 0;
    }

    addProduct(producto:product){

        let checkCode = this.Products.some(element => producto.code === element.code);

        if(checkCode){
            console.log("el codigo se ha repetido con otro producto");
        }
        else{
            producto.id = this.id;
            this.Products.push(producto);
            this.id++

            console.log("el producto " + JSON.stringify(producto) + " se ha agregado al array, ahora el id de la clase es " + this.id);
        }
        
        
    }

    getAllProducts(){
        return this.Products;
    }

    getLimitedProducts(limit:number){

        if(this.Products.length < limit){

            return this.getAllProducts();

        }else{

            let newArray = [];

            for (let index = 0; index < limit; index++) {
                
                const element = this.Products[index];
                
                newArray.push(element);

            }

            return newArray;

        }

    }

    getProduct(id:number){

        let find = this.Products.find(element => element.id === id);

        if(find === undefined){
            console.log("el elemento no se encuentra");
        }else{
            return find;
        }
    }
    
    updateProduct(id:number, newProduct:product){

        let producto = this.Products.findIndex(element => element.id === id);

        this.Products.splice(producto, 1, newProduct);

    }

    deleteProduct(id:number){

        let producto = this.Products.findIndex(element => element.id === id);

        this.Products.splice(producto, 1);
    }

    deleteAllProducts(){

        this.Products = [];
    }

}


const mercaderia = new ProductManager();

products.post("/addProduct", (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.thumbnail || !req.body.code || !req.body.stock) {
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

    if(!limit && !id){
        res.status(200).send(mercaderia.getAllProducts());
    }
    else if(!limit && id){
        res.status(200).send(mercaderia.getProduct(id));
    }
    else{
        res.status(200).send(mercaderia.getLimitedProducts(limit));
    }

})


export default products