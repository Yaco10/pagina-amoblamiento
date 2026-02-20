import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }){
    return(
        <div className="grid grid-cols-3 gap-10">
            { products.map((p) => (
                <ProductCard product={p}/>
            ))}
        </div>
    )
}