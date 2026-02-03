import {Product} from "@/types/product";

export default async function getProduct(): Promise<Product[]>{
    const result = await fetch("http://localhost:9080/api/products", {cache:"no-store"});
    if (!result.ok) {
        throw new Error("Product not found");
    }
    return result.json();
}

