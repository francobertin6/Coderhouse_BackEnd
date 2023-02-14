import  express  from "express";
import * as fs from "fs";

const cart = express.Router();
cart.use(express.json());


const carritoJson : any = () => {

    let exists =  fs.existsSync("./files/carrito.json.txt")

    if(exists === true){

        return JSON.parse(fs.readFileSync("./files/carrito.json.txt", "utf-8"));

    }
    else{

        return undefined

    }

}

const CarritoData = () : any => {

    console.log(carritoJson());

    if(carritoJson() === undefined){
        return [];
    }
    else{
        return carritoJson();
    }

}


class CartManager{

    Carts:Array<any>
    id:number
    productsIds:number[]

    constructor(productsIds:number[], carritoJson: []){
        this.Carts = carritoJson;
        this.id = 0;
        this.productsIds = productsIds;
    }

    createCart(){
        let newCart = Object();

        newCart.id = this.id;
        newCart.products = [];

        this.id++;
        console.log(newCart);
        this.Carts.push(newCart);

        fs.writeFileSync("./files/carrito.json.txt", JSON.stringify(this.Carts));
    }

    getProductsId(): any{
        console.log(this.productsIds);
    }

    postProductsId(numberArray: number[]){
        this.productsIds = numberArray;
    }

    AgregateProduct_to_cart(cartId:number, productId:number){

        let findCart = this.Carts.find(element => element.id === cartId);
        let findProduct = this.productsIds.find(element => element === productId);

        if(findCart !== undefined && findProduct !== undefined){
            
            let quantityCheck = findCart.products.find((element: {product : Number}) => {

                return element.product === productId;

            });

            console.log(quantityCheck);

            if(quantityCheck !== undefined){

                let findIndex = findCart.products.findIndex((element:Object) => element === quantityCheck);

                quantityCheck.quantity++

                findCart.products.splice(findIndex, 1, quantityCheck);
                console.log(findCart);

                fs.writeFileSync("./files/carrito.json.txt", JSON.stringify(this.Carts));
            }
            else{
                let newProduct = Object();

                newProduct.product = findProduct;
                newProduct.quantity = 1;

                findCart.products.push(newProduct);
                console.log(findCart);

                fs.writeFileSync("./files/carrito.json.txt", JSON.stringify(this.Carts));

            }

        }else{
            console.log("o carrito no se ha creado o no existe un producto con ese id");
        }

    }

    getProducts_to_cart(cartId:number){
        let findCart = this.Carts.find(element => element.id === cartId);

        if(findCart !== undefined){
            
            console.log(findCart.products);
            return findCart.products;
        }
        else{
            console.log("no se han encontrado carrito con ese id")
        }
    }

}


const productsId = (products:any) : any => {

    if(products === undefined){
        return []
    }
    else{
        return products.map( (element: {id : number}) =>  {return element.id});
    }

} 

let Manager = new CartManager([], CarritoData());

cart.post("/", (req, res) => {

    const products : any = () => {

        let exists = fs.existsSync("./files/productos.json.txt");

        if(exists === true){

            return JSON.parse(fs.readFileSync("./files/productos.json.txt", "utf-8"));

        }
        else{

            return undefined

        }
    }


    Manager.postProductsId(productsId(products()));

    Manager.createCart();

    res.status(200).send("carrito creado exitosamente");
})

cart.post("/:cId/product/:pId", (req, res) => {

    const products : any = () => {

        let exists = fs.existsSync("./files/productos.json.txt");

        if(exists === true){

            return JSON.parse(fs.readFileSync("./files/productos.json.txt", "utf-8"));

        }
        else{

            return undefined
            
        }
    }

    console.log(products())

    Manager.postProductsId(productsId(products()));

    let cartId = Number(req.params.cId);
    let productId = Number(req.params.pId);

    Manager.AgregateProduct_to_cart(cartId, productId);

    res.status(200).send("el producto se ha agregado correctamente");

})

cart.get("/:cId", (req, res) => {

    let cartId = Number(req.params.cId);

    let products = Manager.getProducts_to_cart(cartId);

    res.status(200).send(products);
})




export default cart;