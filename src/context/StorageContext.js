"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const StorageContext = createContext();

const STORAGE_KEY = 'dailypulse_logs';

export function StorageProvider({ children }) {
    const [entries, setEntries] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setEntries(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse logs", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever entries change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        }
    }, [entries, isLoaded]);

    const addEntry = (entry) => {
        // Check if entry for today already exists? Or just append? 
        // Requirement says "Daily log". Usually implies one per day?
        // Let's assume one per day, overwrite if same date, or just simple append.
        // For MVP, simple append or update by date is robust.
        // Let's use date string YYYY-MM-DD as ID if possible.

        // Entry expected: { date: 'YYYY-MM-DD', mood: 1-5, energy: 1-5, sleep: number }
        setEntries(prev => {
            const filtered = prev.filter(e => e.date !== entry.date);
            return [...filtered, { ...entry, timestamp: Date.now() }].sort((a, b) => new Date(b.date) - new Date(a.date));
        });
    };

    const getEntryByDate = (dateStr) => {
        return entries.find(e => e.date === dateStr);
    };

    const exportData = () => {
        if (entries.length === 0) return null;

        const headers = ['date', 'mood', 'energy', 'sleep', 'timestamp'];
        const csvContent = [
            headers.join(','),
            ...entries.map(e => headers.map(h => e[h]).join(','))
        ].join('\n');

        return csvContent;
    };

    return (
        <StorageContext.Provider value={{ entries, addEntry, getEntryByDate, exportData, isLoaded }}>
            {children}
        </StorageContext.Provider>
    );
}

export function useStorage() {
    return useContext(StorageContext);
}
