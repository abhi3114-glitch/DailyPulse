"use client";

import { useState, useEffect } from 'react';
import { useStorage } from '@/context/StorageContext'; // Absolute path requires jsconfig/tsconfig baseurl or just use relational.
// I set import-alias "@/*" so '@/context' should work.
import Slider from './Slider';
import { Smile, Zap, Moon, Save, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    const { addEntry, getEntryByDate } = useStorage();

    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);

    const [mood, setMood] = useState(3);
    const [energy, setEnergy] = useState(3);
    const [sleep, setSleep] = useState(7);

    const [saved, setSaved] = useState(false);

    // Load existing data for selected date
    useEffect(() => {
        const entry = getEntryByDate(date);
        if (entry) {
            setMood(entry.mood);
            setEnergy(entry.energy);
            setSleep(entry.sleep);
        } else {
            // Reset defaults if no entry
            setMood(3);
            setEnergy(3);
            setSleep(7);
        }
    }, [date, getEntryByDate]);

    const handleSave = () => {
        addEntry({ date, mood, energy, sleep });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Daily Log</h2>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--bg-card)',
                        color: 'var(--text-primary)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        colorScheme: 'dark' // Helps inputs in dark mode
                    }}
                />
            </div>

            <Slider
                label="Mood"
                value={mood}
                onChange={setMood}
                min={1}
                max={5}
                icon={Smile}
                color="var(--mood-mid)" // Dynamic color based on value? TODO polish
            />

            <Slider
                label="Energy"
                value={energy}
                onChange={setEnergy}
                min={1}
                max={5}
                icon={Zap}
                color="#f59e0b"
            />

            <Slider
                label="Sleep (hrs)"
                value={sleep}
                onChange={setSleep}
                min={0}
                max={14}
                step={0.5}
                formatValue={(v) => `${v}h`}
                icon={Moon}
                color="#60a5fa"
            />

            <button
                className="btn-primary"
                onClick={handleSave}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
                {saved ? <CheckCircle size={20} /> : <Save size={20} />}
                {saved ? 'Saved!' : 'Log Entry'}
            </button>
        </div>
    );
}
