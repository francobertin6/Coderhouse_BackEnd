import * as fs from "fs";

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


class ProductManager{

    Products: product[];
    id : number;
    path:string;

    constructor(products: product[], id: number){
        this.Products = products;
        this.id = id;
        this.path = "./files/productos.json.txt"
    }


    addProduct(producto:product){

        console.log(this.Products)

        let checkCode = this.Products.some(element => producto.code === element.code);

        if(checkCode){
            console.log("el codigo se ha repetido con otro producto");
        }
        else{
            producto.id = this.id;
            this.Products.push(producto);
            this.id++

            console.log("el producto " + JSON.stringify(producto) + " se ha agregado al array, ahora el id de la clase es " + this.id);
            fs.writeFileSync(this.path, JSON.stringify(this.Products));
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

        console.log("el producto: " + producto + "\n" + "se ha cambiado por: " + JSON.stringify(newProduct));

    }

    deleteProduct(id:number){

        let producto = this.Products.findIndex(element => element.id === id);

        this.Products.splice(producto, 1);
    }

    deleteAllProducts(){

        this.Products = [];
    }

}


export default ProductManager