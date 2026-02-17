import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }){
    return(
        <div className="grid-cols-3">
            { products.map((p) => (
                <ProductCard product={p}/>
            ))}
        </div>
    )
}