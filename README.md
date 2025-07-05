# React Spreadsheet Assignment

A professional React-based spreadsheet application built with modern web technologies.

## Project Overview

This is a pixel-perfect spreadsheet prototype that matches the Figma design requirements. The application provides a Google Sheets/Excel-like experience with advanced functionality.

## Features

### Core Functionality
- **Pixel-perfect UI** - Matches Figma design exactly
- **Spreadsheet-like experience** - Grid layout with proper navigation
- **Interactive elements** - All buttons and tabs are functional
- **No dead UI** - Every interactive element logs to console or changes state

### Advanced Features
- **Extended Keyboard Navigation** - Arrow keys, Tab, Enter for cell navigation
- **Cell Selection** - Click to select cells with visual focus indicators
- **Copy/Paste Functionality** - Ctrl+C/Ctrl+V, right-click context menu
- **Search & Filter** - Real-time search across all cells with filtering
- **Export Features** - CSV export and print functionality
- **Cell Editing** - Inline cell editing with data persistence

### Technical Features
- **TypeScript** - Strict type checking enabled
- **ESLint Compliance** - Code passes all linting requirements
- **Responsive Design** - Works on different screen sizes
- **Accessibility** - Keyboard navigation and screen reader support

## Tech Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Professional UI components
- **React Router** - Client-side routing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anurag03singh/React-Assignment.git
   cd React-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080/`

## Usage

### Navigation
- **Arrow Keys** - Move between cells
- **Tab/Shift+Tab** - Move right/left between cells
- **Enter/Shift+Enter** - Move down/up between cells
- **Click** - Select any cell

### Editing
- **Click any cell** to edit
- **Type directly** in cells
- **Data persists** during session

### Search & Filter
- **Type in search box** for real-time filtering
- **See results count** and matching rows
- **Click "Clear"** to reset filters

### Copy/Paste
- **Ctrl+C** - Copy selected cell content
- **Ctrl+V** - Paste to selected cell
- **Right-click** - Copy cell content

### Export
- **Click "Export"** - Download as CSV
- **Click "Print"** - Open print-friendly window

## Assignment Requirements Met

✅ **Pixel-close layout to Figma**  
✅ **Google Sheet/Excel-like spreadsheet experience**  
✅ **All buttons/tabs change state or log to console**  
✅ **Code passes npm run lint and npm run type-check**  
✅ **Clean commit history with meaningful messages**  
✅ **Stretch goals: Keyboard navigation, advanced features**  

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality
- **ESLint** - Code linting and style enforcement
- **TypeScript** - Type checking and IntelliSense
- **Prettier** - Code formatting

## Project Structure

```
src/
├── components/
│   ├── Spreadsheet.tsx    # Main spreadsheet component
│   ├── StatusBadge.tsx    # Status indicator component
│   ├── PriorityBadge.tsx  # Priority indicator component
│   └── ui/               # shadcn/ui components
├── pages/
│   ├── Index.tsx         # Main page
│   └── NotFound.tsx      # 404 page
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── index.css            # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is created for educational purposes as part of a React assignment.

## Author

Anurag Singh - React Assignment Submission
