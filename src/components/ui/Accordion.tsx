import { useEffect, useRef, useState } from "react";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function({title,children}:Props){
    const [open, setOpen] = useState<boolean>(false)
    const [height,setHeight] = useState<number>(0)

    const notOpenSigne = '+';
    const openSigne = '-';    

    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        if(ref.current){
            setHeight(ref.current.scrollHeight)
        }
    },[open])

    return(
        <div>
            <button
          className={`w-full py-4 flex justify-between cursor-pointer`}
          onClick={() => setOpen(!open)}
        >
          <p className="font-semibold">{title}</p>
          <span className="font-semibold">{open === true ? openSigne : notOpenSigne}</span>
        </button>
        <div
          ref={ref}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{ maxHeight: open === true ? height : 0 }}
        >
          <div className={`pt-4`}>
            {children}
          </div>
        </div>
        <div className="border-b border-(--color-brand-accent)/50 "></div>
        </div>
    )
}