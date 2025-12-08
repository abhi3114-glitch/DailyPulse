import Dashboard from "@/components/Dashboard";
import HistoryCharts from "@/components/HistoryCharts";

export default function Home() {
  return (
    <main>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>DailyPulse</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track your day in seconds.</p>
      </header>

      <Dashboard />
      <div style={{ marginTop: '2rem' }}>
        <HistoryCharts />
      </div>
    </main>
  );
}
