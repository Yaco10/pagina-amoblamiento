import React, { useEffect, useRef, useState } from 'react';
import type { Product, ProductVariant } from '../../data/product';

export default function ProductAccordion({
  product,
  variant,
}: {
  product: Product;
  variant: ProductVariant;
}) {
  const [open, setOpen] = useState<string>('');
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const [envioHeight, setEnvioHeight] = useState<number>(0);
  const [garantiaHeight, setGarantiaHeight] = useState<number>(0);

  const notOpenSigne = '+';
  const openSigne = '-';

  const refDescription = useRef<HTMLDivElement | null>(null);
  const refEnvio = useRef<HTMLDivElement | null>(null);
  const refGarantia = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (refDescription.current) {
      setDescriptionHeight(refDescription.current.scrollHeight);
    }
    if (refEnvio.current) {
      setEnvioHeight(refEnvio.current.scrollHeight);
    }
    if (refGarantia.current) {
      setGarantiaHeight(refGarantia.current.scrollHeight);
    }
  }, [open]);

  function switchAcordeon(clicked: string) {
    if (open === clicked) {
      setOpen('');
    } else {
      setOpen(clicked);
    }
  }

  return (
    <div>
      {/* DESCRIPCIÓN */}

      <div className="my-4">
        <button
          className="w-full bg-(--color-brand-surface) px-4 py-2 rounded-sm flex justify-between cursor-pointer"
          onClick={() => switchAcordeon('description')}
        >
          <p className="font-semibold">Descripción</p>
          <span className="font-semibold">{open === 'description' ? openSigne : notOpenSigne}</span>
        </button>

        <div
          ref={refDescription}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{ maxHeight: open === 'description' ? descriptionHeight : 0 }}
        >
          <div className="pt-4">
            <p className="leading-relaxed text-sm">{product.description}</p>

            <h3 className="pt-5 pb-3 text-base font-bold font-body">Medidas del mueble</h3>

            <div className="space-y-1 text-sm pl-2">
              <p>
                <span className="font-semibold">Alto:</span> {variant.realSize.alto} cm
              </p>

              <p>
                <span className="font-semibold">Ancho:</span> {variant.realSize.ancho} cm
              </p>

              <p>
                <span className="font-semibold">Profundidad:</span> {variant.realSize.profundidad}{' '}
                cm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ENVÍOS */}

      <div className="my-4">
        <button
          className="w-full bg-(--color-brand-surface) px-4 py-2 rounded-sm flex justify-between cursor-pointer"
          onClick={() => switchAcordeon('envio')}
        >
          <p className="font-semibold">Envíos</p>
          <span className="font-semibold">{open === 'envio' ? openSigne : notOpenSigne}</span>
        </button>

        <div
          ref={refEnvio}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{ maxHeight: open === 'envio' ? envioHeight : 0 }}
        >
          <div className="pt-4 text-sm space-y-3">
            <p className="leading-relaxed">
              Los envíos se coordinan a través de <span className="font-semibold">WhatsApp</span>{' '}
              para brindarte una atención rápida y personalizada. Una vez realizada la compra,
              organizaremos por ese medio todos los detalles de entrega.
            </p>

            <div className="space-y-2 pl-2">
              <p className="font-semibold">Compra protegida</p>
              <p>
                Hacemos seguimiento del envío desde el momento del despacho hasta que recibís tu
                producto para que tu experiencia sea segura y tranquila.
              </p>

              <p className="font-semibold pt-2">Seguimiento del pedido</p>
              <p>
                Cuando tu pedido sea despachado recibirás el número de seguimiento para poder
                rastrear tu paquete de forma simple.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GARANTÍA */}

      <div className="my-4">
        <button
          className="w-full bg-(--color-brand-surface) px-4 py-2 rounded-sm flex justify-between cursor-pointer"
          onClick={() => switchAcordeon('garantia')}
        >
          <p className="font-semibold">Garantía</p>
          <span className="font-semibold">{open === 'garantia' ? openSigne : notOpenSigne}</span>
        </button>

        <div
          ref={refGarantia}
          className="overflow-hidden transition-all ease-in duration-400"
          style={{ maxHeight: open === 'garantia' ? garantiaHeight : 0 }}
        >
          <div className="pt-4 text-sm space-y-4">
            <p className="leading-relaxed">
              En Savia Mobel diseñamos muebles pensados para durar. Por eso todos nuestros productos
              cuentan con garantía para que puedas comprar con tranquilidad y confianza.
            </p>

            <div className="space-y-3 pl-2">
              <div>
                <p className="font-semibold">Garantía por defectos de fabricación — 1 mes</p>
                <p>
                  La garantía cubre problemas relacionados con materiales o componentes del mueble,
                  como fallas en melamina, bisagras, correderas u otros herrajes.
                </p>
              </div>

              <div>
                <p className="font-semibold">Daños por transporte — aviso dentro de 48 horas</p>
                <p>
                  Si al recibir tu pedido notás daños visibles o piezas faltantes, es importante
                  informarlo dentro de las 48 horas posteriores a la entrega para poder evaluarlo
                  rápidamente.
                </p>
              </div>

              <div>
                <p className="font-semibold">La garantía no cubre</p>
                <ul className="list-disc pl-5">
                  <li>Mal uso del producto</li>
                  <li>Exposición a humedad o agua</li>
                  <li>Rayones o desgaste por uso normal</li>
                  <li>Golpes o daños accidentales</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Soluciones posibles</p>
                <ul className="list-disc pl-5">
                  <li>Envío de pieza de repuesto</li>
                  <li>Reparación a domicilio (cuando sea posible)</li>
                  <li>Asistencia para realizar la reparación</li>
                  <li>Reposición del producto en casos donde el defecto sea grave</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
