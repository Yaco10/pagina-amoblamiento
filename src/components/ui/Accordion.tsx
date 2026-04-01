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
          className="btn-ui-accordion"
          onClick={() => setOpen(!open)}
        >
          <span className="text-[0.95rem] font-body font-semibold uppercase tracking-[0.12em] text-brand-wood">
            {title}
          </span>
          <span className="min-w-5 text-right text-lg font-medium leading-none text-brand-wood/80 transition-colors duration-200">
            {open === true ? openSigne : notOpenSigne}
          </span>
        </button>
        <div
          ref={ref}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{ maxHeight: open === true ? height : 0 }}
        >
          <div className="pb-4 pt-1">
            {children}
          </div>
        </div>
        <div className="border-b border-brand-wood/14"></div>
        </div>
    )
}
