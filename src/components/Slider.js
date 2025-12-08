"use client";

import { useMemo } from 'react';

export default function Slider({ label, value, onChange, min = 1, max = 5, icon: Icon, color, formatValue }) {

    const percentage = useMemo(() => {
        return ((value - min) / (max - min)) * 100;
    }, [value, min, max]);

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {Icon && <Icon size={20} color={color || 'var(--text-primary)'} />}
                    <label style={{ fontWeight: 500 }}>{label}</label>
                </div>
                <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: color || 'var(--accent)'
                }}>
                    {formatValue ? formatValue(value) : value}
                </span>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    step={0.5} // Allow half points? User asked for 1-5. Let's start with integer or 0.5. 1-minute tracker implies simplicity. Integers are fine.
                // Wait, Sleep is hours. Might need half hours.
                />
            </div>
        </div>
    );
}
