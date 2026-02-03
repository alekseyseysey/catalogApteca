import {Product} from "@/types/product";
import getProduct from "@/api/productsApi";
import ClientCatalog from "@/ClientComponents/ClientCatalog";



export default async function Catalog(){

const products :Product[] = await getProduct();

    return (
        <div className="flex bg-gray-300 p-10 justify-center">
            <ClientCatalog products={products} />
        </div>
    )
}