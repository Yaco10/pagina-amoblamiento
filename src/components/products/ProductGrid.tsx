import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }){
    return(
        <div>
            { products.map((p) => (
                <ProductCard product={p}/>
            ))}
        </div>
    )
}