import React, { useEffect, useRef, useState } from "react";
import type { Product } from "../../data/product";

export default function ProductAccordion(product: Product) {
  const [open, setOpen] = useState<string>("");
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
   const [envioHeight, setEnvioHeight] = useState<number>(0);
    const [garantiaHeight, setGarantiaHeight] = useState<number>(0);
  const notOpenSigne = "+";
  const openSigne = "-";
  const height = 1000;

  const refDescription = useRef<HTMLDivElement | null>(null);
  const refEnvio = useRef<HTMLDivElement | null>(null);
  const refGarantia = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    if(refDescription.current){
      setDescriptionHeight(refDescription.current.scrollHeight)
    }
    if(refEnvio.current){
      setEnvioHeight(refEnvio.current.scrollHeight)
    }
    if(refGarantia.current){
      setGarantiaHeight(refGarantia.current.scrollHeight)
    }
  },[open])

  function switchAcordeon (clicked: string) {
     console.log(clicked, open)
    if(open == ""){
      setOpen(clicked)
    }
    else{
      if(open == clicked){
        setOpen("")
      }
      else{
        setOpen(clicked)
      }
    }
  }

  return (
    <div>
      <div>
        <button
          className="w-full bg-(--color-brand-surface) px-4 py-2 my-4 rounded-sm flex justify-between cursor-pointer"
          onClick={() => {
            (switchAcordeon("description") );
          }}
        >
          <p className="font-semibold">Descripcion</p>
          <span className="font-semibold">
            {(open == "description") ? openSigne : notOpenSigne}
          </span>
        </button>
        <div
          ref={refDescription}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{maxHeight: (open == "description") ? descriptionHeight : 0}}
        >
          <h1>Titulo</h1>
        </div>
      </div>

      <div>
        <button
          className="w-full bg-(--color-brand-surface) px-4 py-2 rounded-sm flex justify-between cursor-pointer"
          onClick={() => {
            (switchAcordeon("envio") );
          }}
        >
          <p className="font-semibold">Envio</p>
          <span className="font-semibold">
            {(open == "envio") ? openSigne : notOpenSigne}
          </span>
        </button>
        <div
          ref={refDescription}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{maxHeight: (open == "envio") ? envioHeight : 0}}
        >
          <h1>Titulo</h1>
        </div>
      </div>

      <div>
        <button
          className="w-full bg-(--color-brand-surface) px-4 py-2 my-4 rounded-sm flex justify-between cursor-pointer"
          onClick={() => {
            (switchAcordeon("garantia") );
          }}
        >
          <p className="font-semibold">Garantia</p>
          <span className="font-semibold">
            {(open == "garantia") ? openSigne : notOpenSigne}
          </span>
        </button>
        <div
          ref={refDescription}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{maxHeight: (open == "garantia") ? garantiaHeight : 0}}
        >
          <h1>Titulo</h1>
        </div>
      </div>
    </div>
  );
}
