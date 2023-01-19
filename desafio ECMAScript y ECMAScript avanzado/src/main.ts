
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

    constructor(products: product[]){
        this.Products = products
    }

    AddProduct(productos:product){

        console.log("inicio: " + JSON.stringify(this.Products))

        if(this.Products.length === 0){
            productos.id = 1;
            this.Products.push(productos); 

        }else if(this.Products.length !== 0){

            for(let product of this.Products){

                productos.id = this.Products.length;

            if(productos.code === product.code){
                console.log("el codigo del nuevo producto es igual a otro codigo");
                break;
            }else{
                console.log(productos.id);
                this.Products.push(productos);
            }
        }
        }

        console.log("final: " + JSON.stringify(this.Products))

    }

    GetProducts(){
        console.log(this.Products);
    }

    getProductById(id:number){

        for(let product of this.Products){

            if(id === product.id){
                console.log("result getProductById: " + JSON.stringify(product));
            }else{
                console.log("error not found");
            }
        }

    }

}


let camisas = new ProductManager([]);

camisas.AddProduct({
    title: "camisa",
    description: "manga corta",
    price: 250,
    thumbnail: "url....",
    code: "codigo cualquiera 1",
    stock: 500
});

camisas.AddProduct({
    title: "chomba",
    description: "negras con flores",
    price: 150,
    thumbnail: "url....",
    code: "codigo cualquiera 2",
    stock: 200
});

camisas.AddProduct({
    title: "remeras",
    description: "blancas lisas",
    price: 100,
    thumbnail: "url....",
    code: "codigo cualquiera 1",
    stock: 800
});

setTimeout(() => {
    camisas.GetProducts();
}, 5000);

setTimeout(() =>{
    camisas.getProductById(1);
}, 5000)