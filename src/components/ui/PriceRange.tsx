import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (vals: [number, number]) => void;
  format?: (n: number) => string;
};

export default function PriceRange({
  min,
  max,
  step = 1000,
  value,
  onChange,
  format = (n) => n.toLocaleString("es-AR"),
}: Props) {
  const [values, setValues] = useState<[number, number]>(value);

  // Mantener sincronizado si el padre actualiza value (ej: "Limpiar")
  useEffect(() => {
    setValues(value);
  }, [value]);

  return (
    <div className="w-full">
      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={(vals) => {
          const next = [vals[0], vals[1]] as [number, number];
          setValues(next);
          onChange(next);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full rounded-full"
            style={{
              background: getTrackBackground({
                values,
                colors: ["rgba(0,0,0,0.12)", "rgba(0,0,0,0.95)", "rgba(0,0,0,0.12)"],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            className="h-5 w-5 rounded-full bg-white border-2 border-black shadow-md cursor-pointer outline-none"
            aria-label={index === 0 ? "Precio mínimo" : "Precio máximo"}
          />
        )}
      />

      <div className="mt-3 text-sm text-black/70">
        Precio:{" "}
        <span className="font-semibold text-black">${format(values[0])}</span> –{" "}
        <span className="font-semibold text-black">${format(values[1])}</span>
      </div>
    </div>
  );
}