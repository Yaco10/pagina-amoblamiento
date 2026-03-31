import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

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
  format = (n) => n.toLocaleString('es-AR'),
}: Props) {
  const [values, setValues] = useState<[number, number]>(value);

  useEffect(() => {
    setValues(value);
  }, [value]);

  return (
    <div className="w-full">
      <div className="px-[10px] py-1">
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
              className="h-2.5 w-full rounded-full shadow-[inset_0_1px_2px_rgba(64,53,40,0.12)]"
              style={{
                ...props.style,
                background: getTrackBackground({
                  values,
                  colors: [
                    'color-mix(in srgb, var(--color-brand-coyote) 20%, white)',
                    'var(--color-brand-accent)',
                    'color-mix(in srgb, var(--color-brand-coyote) 20%, white)',
                  ],
                  min,
                  max,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index, isDragged }) => (
            <div
              {...props}
              className="h-[18px] w-[18px] cursor-pointer rounded-full border border-[color:var(--color-brand-wood)]/70 bg-[color:var(--color-brand-base)] outline-none transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label={index === 0 ? 'Precio minimo' : 'Precio maximo'}
              style={{
                ...props.style,
                boxShadow: isDragged
                  ? '0 0 0 5px color-mix(in srgb, var(--color-brand-accent) 14%, transparent), 0 10px 18px rgba(64,53,40,0.18)'
                  : '0 6px 14px rgba(64,53,40,0.16)',
              }}
            />
          )}
        />
      </div>

      <div className="mt-3 text-sm text-[color:var(--color-brand-coyote)]/90">
        Precio:{' '}
        <span className="font-semibold text-[color:var(--color-brand-wood)]">${format(values[0])}</span>{' '}
        -{' '}
        <span className="font-semibold text-[color:var(--color-brand-wood)]">${format(values[1])}</span>
      </div>
    </div>
  );
}
