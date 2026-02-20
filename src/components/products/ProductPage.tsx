import { PRODUCTS } from "../../data/product"
import type { Product } from "../../data/product";
import { calculateFinalPrice } from "../../data/product";


export default function ProductPage({product} : {product: String}) {
    const productObject = PRODUCTS.find((p) => p.slug === product) as Product

    
    return(
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <img src="" alt="" />
                    <div className="flex-row"></div>
                </div>
                <div className="flex flex-col">
                    <h1>{productObject.title}</h1>
                    <div className="flex flex-row">
                        <h2>{calculateFinalPrice(productObject.originalPrice, productObject.discountPercentage)}</h2>
                        {productObject.discountPercentage && <p>{productObject.originalPrice}</p>}
                    </div>
                    
                </div>
            </div>

    )
}