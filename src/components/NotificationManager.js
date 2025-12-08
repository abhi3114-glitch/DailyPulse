"use client";
import { useEffect } from 'react';

export default function NotificationManager() {
    useEffect(() => {
        if (typeof window === 'undefined' || !("Notification" in window)) return;

        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }

        const checkTime = () => {
            const now = new Date();
            const hour = now.getHours();
            // Target: 21:00 (9 PM)
            // We check if it's 21:00-21:59 and we haven't notified yet.
            // Better: Check if it's 21:00.
            if (hour === 21) {
                const today = now.toDateString();
                const lastNotified = localStorage.getItem('dailypulse_last_notification');

                if (lastNotified !== today) {
                    if (Notification.permission === "granted") {
                        new Notification("DailyPulse Reminder", {
                            body: "Time to log your mood, energy, and sleep!",
                        });
                    }
                    localStorage.setItem('dailypulse_last_notification', today);
                }
            }
        };

        const interval = setInterval(checkTime, 60000); // Check every minute
        checkTime(); // Initial check

        return () => clearInterval(interval);
    }, []);

    return null;
}
