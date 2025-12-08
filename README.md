# DailyPulse

A minimalist web application for tracking daily mood, energy levels, and sleep patterns. Built with Next.js and Chart.js, DailyPulse provides a fast, privacy-focused solution for personal wellness monitoring.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Component Documentation](#component-documentation)
- [Data Model](#data-model)
- [Browser Compatibility](#browser-compatibility)
- [Troubleshooting](#troubleshooting)
- [Privacy and Security](#privacy-and-security)
- [Development](#development)
- [License](#license)

## Overview

DailyPulse is designed to help users maintain awareness of their daily wellness metrics through a simple, one-minute logging ritual. The application emphasizes speed, privacy, and visual clarity, making it easy to track patterns over time without complexity.

### Design Philosophy

- **Minimalist Interface**: Three sliders, one button. No unnecessary features or distractions.
- **Privacy First**: All data stored locally in the browser. No servers, no accounts, no tracking.
- **Offline Capable**: Fully functional without an internet connection.
- **Visual Feedback**: Immediate chart visualization of trends and patterns.

## Features

### Daily Logging System

The core functionality centers on three key metrics:

- **Mood Tracking**: Rate emotional state on a 1-5 scale
- **Energy Monitoring**: Log physical energy levels from 1 (exhausted) to 5 (energized)
- **Sleep Recording**: Track hours slept with 0.5-hour precision, range 0-14 hours

Each metric is controlled via a custom-styled range slider with real-time value display and icon representation. The interface automatically saves to the current date but allows users to select previous dates for retroactive logging or editing.

### Data Visualization

Interactive charts powered by Chart.js provide immediate visual feedback:

- **Line Chart**: Displays mood and energy trends over time with color-coded lines (green for mood, amber for energy)
- **Bar Chart**: Shows sleep hours as vertical bars for easy pattern recognition
- **Responsive Design**: Charts adapt to container width while maintaining readability

Charts automatically update when new entries are logged and handle empty states gracefully.

### Data Export

One-click CSV export generates a complete snapshot of all logged entries with the following columns:
- Date (YYYY-MM-DD format)
- Mood (1-5)
- Energy (1-5)
- Sleep (hours)
- Timestamp (Unix milliseconds)

The export file is named `dailypulse_export_YYYY-MM-DD.csv` based on the export date.

### Daily Reminders

Browser-based notification system sends a gentle reminder at 21:00 (9 PM) local time each day. The system:
- Requests permission on first application load
- Tracks the last notification date to prevent duplicates
- Runs a background check every minute during active sessions
- Displays notification title and body encouraging daily logging

### Offline Functionality

The application operates entirely in the browser using localStorage for data persistence. No server connection is required after the initial page load, making it fully functional:
- Without internet access
- On local networks
- In airplane mode

## Technical Architecture

### Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.0.7 |
| UI Library | React | 19.2.0 |
| Charting | Chart.js | 4.5.1 |
| Chart Integration | react-chartjs-2 | 5.3.1 |
| Icons | lucide-react | 0.556.0 |
| Styling | Vanilla CSS | N/A |
| Build Tool | Next.js Compiler | Built-in |

### Architecture Patterns

- **Context API**: Global state management via StorageContext
- **Component Composition**: Reusable Slider component used across metrics
- **Client Components**: All interactive components marked with "use client"
- **CSS Variables**: Design system implemented via custom properties
- **Local Storage**: Browser-native persistence without external dependencies

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (bundled with Node.js)

To verify your installations:

```bash
node --version
npm --version
```

### Installation

1. Clone or download the repository:

```bash
git clone <repository-url>
cd DailyPulse
```

2. Install all project dependencies:

```bash
npm install
```

This will install approximately 250MB of dependencies including Next.js, React, Chart.js, and development tools.

### Running in Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at:
- Local: http://localhost:3000
- Network: http://[your-ip]:3000

The server supports hot reloading, meaning changes to source files will automatically refresh the browser.

### Building for Production

Generate an optimized production build:

```bash
npm run build
```

This command:
- Compiles and minifies all JavaScript
- Optimizes CSS
- Generates static assets
- Creates a `.next` directory with the production bundle

To serve the production build:

```bash
npm start
```

The production server runs on port 3000 by default.

## Usage Guide

### First-Time Setup

1. Open the application in a modern web browser
2. Allow notification permissions when prompted (optional but recommended)
3. Begin logging your first entry

### Daily Logging Workflow

1. **Access the Application**: Navigate to the URL (bookmark recommended for daily access)
2. **Adjust Sliders**: 
   - Drag the Mood slider to reflect current emotional state
   - Set Energy level based on physical vitality
   - Input sleep hours from the previous night
3. **Save Entry**: Click the "Log Entry" button
4. **Confirmation**: Button briefly changes to "Saved!" with checkmark icon
5. **Review**: Scroll down to see your data visualized in charts

### Editing Previous Entries

1. Click the date picker control (top-right of Daily Log card)
2. Select the date you want to edit
3. Existing values for that date will populate the sliders
4. Adjust as needed and click "Log Entry" to update

### Exporting Your Data

1. Scroll to the History section
2. Click "Export CSV" link in the section header
3. Browser will download `dailypulse_export_YYYY-MM-DD.csv`
4. Open in Excel, Google Sheets, or any spreadsheet application

### Managing Notifications

Notifications can be controlled through browser settings:

**Chrome/Edge**: Settings > Privacy and Security > Site Settings > Notifications
**Firefox**: Settings > Privacy & Security > Permissions > Notifications
**Safari**: Preferences > Websites > Notifications

## Project Structure

```
c:/PROJECTS/ez10/DailyPulse/
├── src/
│   ├── app/                          # Next.js App Router directory
│   │   ├── layout.js                 # Root layout with providers and metadata
│   │   ├── page.js                   # Main dashboard page
│   │   ├── globals.css               # Global styles and CSS variables
│   │   └── manifest.json             # PWA manifest (currently unused)
│   ├── components/                   # React components
│   │   ├── Dashboard.js              # Daily logging interface
│   │   ├── HistoryCharts.js          # Chart.js visualization wrapper
│   │   ├── Slider.js                 # Reusable range input component
│   │   └── NotificationManager.js    # Browser notification handler
│   └── context/                      # React Context providers
│       └── StorageContext.js         # localStorage abstraction layer
├── public/                           # Static assets
│   ├── icon.png                      # Application icon
│   └── [Next.js defaults]            # Default favicon, etc.
├── .next/                            # Build output (generated)
├── node_modules/                     # Dependencies (generated)
├── package.json                      # Project metadata and scripts
├── package-lock.json                 # Dependency lock file
├── next.config.mjs                   # Next.js configuration
├── jsconfig.json                     # JavaScript compiler options
├── eslint.config.mjs                 # ESLint configuration
└── README.md                         # This file
```

## Component Documentation

### StorageContext

Location: `src/context/StorageContext.js`

Provides centralized localStorage management for the application.

**Exports:**
- `StorageProvider`: Context provider component
- `useStorage`: Hook to access storage functionality

**API Methods:**

```javascript
const { entries, addEntry, getEntryByDate, exportData, isLoaded } = useStorage();
```

- `entries`: Array of all log entries, sorted by date descending
- `addEntry(entry)`: Save or update an entry (merges with existing date)
- `getEntryByDate(dateString)`: Retrieve entry for specific date
- `exportData()`: Generate CSV string of all entries
- `isLoaded`: Boolean indicating localStorage has been read

**Data Schema:**
```javascript
{
  date: "YYYY-MM-DD",
  mood: 1-5,
  energy: 1-5,
  sleep: 0-14,
  timestamp: 1234567890123
}
```

### Dashboard Component

Location: `src/components/Dashboard.js`

Main user interface for daily logging.

**Features:**
- Date picker for selecting entry date
- Three Slider instances for mood, energy, sleep
- Save button with loading state
- Automatic loading of existing entries

**Props:** None (uses context)

### HistoryCharts Component

Location: `src/components/HistoryCharts.js`

Renders Chart.js visualizations of user data.

**Features:**
- Line chart with dual datasets (mood and energy)
- Bar chart for sleep hours
- CSV export button
- Empty state handling

**Props:** None (uses context)

### Slider Component

Location: `src/components/Slider.js`

Reusable range input with custom styling.

**Props:**
- `label`: Display text
- `value`: Current numeric value
- `onChange`: Callback function receiving new value
- `min`: Minimum slider value (default: 1)
- `max`: Maximum slider value (default: 5)
- `icon`: Lucide icon component
- `color`: CSS color value for icon and value display
- `formatValue`: Optional function to format displayed value

### NotificationManager Component

Location: `src/components/NotificationManager.js`

Handles browser notification scheduling.

**Behavior:**
- Requests permission on mount
- Checks time every 60 seconds
- Triggers notification at 21:00 local time
- Prevents duplicate notifications using localStorage flag

**Props:** None

## Data Model

### Storage Key

All data is stored under the localStorage key: `dailypulse_logs`

### Entry Structure

```typescript
interface Entry {
  date: string;        // ISO date string (YYYY-MM-DD)
  mood: number;        // Integer 1-5
  energy: number;      // Integer 1-5
  sleep: number;       // Decimal 0-14 (0.5 increments)
  timestamp: number;   // Unix timestamp in milliseconds
}
```

### Storage Format

Entries are stored as a JSON array:

```json
[
  {
    "date": "2025-12-08",
    "mood": 4,
    "energy": 3,
    "sleep": 7.5,
    "timestamp": 1765210540702
  }
]
```

## Browser Compatibility

### Minimum Requirements

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Full support |
| Edge | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Opera | 76+ | Full support |

### Required APIs

- localStorage API (for data persistence)
- Notification API (for daily reminders, optional)
- ES2020+ JavaScript features
- CSS Grid and Flexbox

### Known Limitations

- **Internet Explorer**: Not supported (lacks ES2020+ features)
- **Opera Mini**: Limited support (localStorage restrictions)
- **Private/Incognito Mode**: Data will be cleared when session ends

## Troubleshooting

### Data Not Persisting

**Issue:** Entries disappear after closing the browser

**Solutions:**
- Check if browser is in private/incognito mode
- Verify localStorage is enabled in browser settings
- Ensure browser has storage quota available
- Check browser console for localStorage errors

### Charts Not Displaying

**Issue:** History section shows empty or broken charts

**Solutions:**
- Log at least one entry to populate charts
- Check browser console for JavaScript errors
- Verify Chart.js loaded correctly (check Network tab)
- Try clearing browser cache and hard reload

### Notifications Not Working

**Issue:** No reminder at 9 PM

**Solutions:**
- Verify notification permission granted in browser settings
- Ensure browser tab remains open or app is PWA-installed
- Check system notification settings (operating system level)
- Verify browser supports Notification API

### Dev Server Won't Start

**Issue:** `npm run dev` fails

**Solutions:**
- Delete `node_modules` and `.next` directories
- Run `npm install` again
- Check for port 3000 conflicts: `netstat -ano | findstr :3000`
- Verify Node.js version is 18+

### Build Errors

**Issue:** `npm run build` fails

**Solutions:**
- Check for syntax errors in component files
- Ensure all imports are correct
- Clear `.next` directory and rebuild
- Verify all dependencies installed correctly

## Privacy and Security

### Data Storage

- All user data stored exclusively in browser localStorage
- No data transmitted to external servers
- No analytics or tracking scripts
- No cookies used

### Data Ownership

You own 100% of your data. Export to CSV at any time for backup or migration.

### Data Deletion

To completely remove all data:

1. Open browser developer tools (F12)
2. Navigate to Application > Local Storage
3. Find `dailypulse_logs` key
4. Right-click and delete

Alternatively, clear browser data for the application's domain.

## Development

### Adding New Features

1. Create new component in `src/components/`
2. Import and use in `src/app/page.js`
3. If state needed, extend `StorageContext`
4. Update CSS in `globals.css` using existing CSS variables

### Modifying Styles

All colors and spacing use CSS variables defined in `globals.css`:

```css
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-card: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --accent: #8b5cf6;
  --accent-hover: #7c3aed;
  /* ... */
}
```

Modify these values to change the entire theme.

### Running Linter

Check code quality:

```bash
npm run lint
```

### Code Formatting

The project uses ESLint with Next.js recommended configuration. Auto-fix issues:

```bash
npx eslint src --fix
```

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software for any purpose, commercial or non-commercial.

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request with clear description

## Support

For issues, questions, or feature requests, please open an issue on the project repository.

## Changelog

### Version 1.0.0

Initial release with core features:
- Daily mood, energy, and sleep tracking
- Chart.js visualizations
- CSV export
- Browser notifications
- localStorage persistence
- Dark theme UI
