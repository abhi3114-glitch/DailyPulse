"use client";

import { useMemo } from 'react';
import { useStorage } from '@/context/StorageContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function HistoryCharts() {
    const { entries, exportData } = useStorage();

    const chartData = useMemo(() => {
        // Sort logs by date ascending
        const sorted = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
        // Take last 7 days? Or just show all? 
        // Let's show last 7 days for visibility in MVP.
        // Or user asked for Weekly + Monthly. 
        // Let's just show last 14 entries for now or simple "Last 7 Days".

        // Fill gaps? 
        // Simply mapping existing entries is easiest for now.

        const labels = sorted.map(e => {
            const d = new Date(e.date);
            return `${d.getMonth() + 1}/${d.getDate()}`;
        });

        return {
            labels,
            mood: sorted.map(e => e.mood),
            energy: sorted.map(e => e.energy),
            sleep: sorted.map(e => e.sleep),
        };
    }, [entries]);

    const handleExport = () => {
        const csv = exportData();
        if (!csv) {
            alert("No data to export!");
            return;
        }
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dailypulse_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (entries.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>No history yet. Log your first day!</p>
            </div>
        );
    }

    const lineOptions = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 6, // 1-5 scale
                grid: { color: '#334155' }
            },
            x: {
                grid: { display: false }
            }
        },
        plugins: {
            legend: { labels: { color: '#94a3b8' } }
        }
    };

    const lineData = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Mood',
                data: chartData.mood,
                borderColor: '#10b981', // green
                backgroundColor: '#10b981',
                tension: 0.3,
            },
            {
                label: 'Energy',
                data: chartData.energy,
                borderColor: '#f59e0b', // amber
                backgroundColor: '#f59e0b',
                tension: 0.3,
            },
        ],
    };

    const sleepData = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Sleep (hrs)',
                data: chartData.sleep,
                backgroundColor: '#60a5fa', // blue
                borderRadius: 6,
            }
        ]
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>History</h2>
                <button
                    onClick={handleExport}
                    style={{
                        background: 'transparent',
                        color: 'var(--accent)',
                        textDecoration: 'underline',
                        fontSize: '0.9rem'
                    }}
                >
                    Export CSV
                </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <Line options={lineOptions} data={lineData} />
            </div>

            <div>
                <Bar
                    options={{
                        responsive: true,
                        scales: { y: { beginAtZero: true, grid: { color: '#334155' } }, x: { grid: { display: false } } },
                        plugins: { legend: { labels: { color: '#94a3b8' } } }
                    }}
                    data={sleepData}
                />
            </div>
        </div>
    );
}
