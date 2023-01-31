"use strict";
const fs = require("fs");
class ProductManager {
    constructor(products, path) {
        this.Products = products;
        this.path = path;
    }
    MakeDB() {
        if (fs.existsSync(this.path)) {
            this.Products = JSON.parse(fs.readFileSync(this.path, 'utf8'));
        }
    }
    AddProduct(productos) {
        console.log("length products: " + this.Products.length);
        productos.id = this.Products.length;
        this.MakeDB();
        const VerifyCode = this.Products.some(element => element.code === productos.code);
        if (VerifyCode !== true) {
            this.Products.push(productos);
            fs.writeFileSync(this.path, JSON.stringify(this.Products));
            return 'producto agregado';
        }
        else {
            return 'el producto tiene el mismo codigo que otro producto';
        }
    }
    GetProducts() {
        let getProducts = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(getProducts);
    }
    getProductById(id) {
        let findProduct = JSON.parse(fs.readFileSync(this.path, 'utf8'));
        for (let product of findProduct) {
            if (id === product.id) {
                console.log("result getProductById: " + JSON.stringify(product));
                return product;
            }
            else {
                console.log("error not found");
            }
        }
    }
    updateProducts(id, property, value) {
        let product = this.getProductById(id);
        let keys = Object.keys(product);
        let values = Object.values(product);
        let newArray = [];
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            if (element === property) {
                values[index] = value;
            }
            newArray.push([element, values[index]]);
        }
        let newproduct = Object.fromEntries(newArray);
        let oldArray = this.GetProducts();
        for (let index = 0; index < oldArray.length; index++) {
            const element = oldArray[index];
            if (element.id === id) {
                oldArray.splice(index, 1, newproduct);
            }
        }
        fs.writeFileSync(this.path, JSON.stringify(oldArray));
    }
    deleteProducts(id) {
        let oldArray = this.GetProducts();
        for (let index = 0; index < oldArray.length; index++) {
            const element = oldArray[index];
            if (element.id === id) {
                oldArray.splice(index, 1);
            }
        }
        console.log(JSON.stringify(oldArray));
        fs.unlinkSync(this.path);
        fs.writeFileSync(this.path, JSON.stringify(oldArray));
    }
    deleteAllProducts() {
        fs.unlinkSync(this.path);
    }
}
let camisas = new ProductManager([], "./ejemplo.txt");
camisas.MakeDB();
setTimeout(() => {
    camisas.AddProduct({
        title: "remeras",
        description: "blancas lisas",
        price: 100,
        thumbnail: "url....",
        code: "codigo cualquiera 1",
        stock: 800
    });
}, 1000);
setTimeout(() => {
    camisas.AddProduct({
        title: "chomba",
        description: "negras con flores",
        price: 150,
        thumbnail: "url....",
        code: "codigo cualquiera 2",
        stock: 200
    });
}, 1500);
setTimeout(() => {
    camisas.AddProduct({
        title: "camisa",
        description: "manga corta",
        price: 250,
        thumbnail: "url....",
        code: "codigo cualquiera 1",
        stock: 500
    });
}, 2000);
setTimeout(() => {
    camisas.GetProducts();
}, 3000);
setTimeout(() => {
    camisas.updateProducts(1, "price", 300);
}, 4000);
setTimeout(() => {
    camisas.deleteProducts(2);
}, 5000);
