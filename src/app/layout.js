import { Geist, Geist_Mono } from "next/font/google";
import { StorageProvider } from "@/context/StorageContext";
import NotificationManager from "@/components/NotificationManager";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DailyPulse",
  description: "1-Minute Mood, Sleep & Energy Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StorageProvider>
          <NotificationManager />
          {children}
        </StorageProvider>
      </body>
    </html>
  );
}
