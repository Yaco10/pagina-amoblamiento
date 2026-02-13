export default function ProductCardImage({ image, slug }){
    return (
         <a href={`/productos/${slug}`}
            className="block "
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden">

            </div>
        </a>
    )
}