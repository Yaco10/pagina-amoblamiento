export default function ProductCard({ product }){
    const cover = product.images?.[0]

    return(
        <div>
             <a href={`/productos/${product.slug}`}
            className="relative aspect-[4/3] overflow-hidden "
             >
                
            </a>
        </div>
       
    )
}