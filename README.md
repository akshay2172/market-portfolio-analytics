# Portfolio Analytics Dashboard

A full-stack web application for tracking and visualizing portfolio performance with real-time market data integration.

## Features

- **Real-time Portfolio Analytics**: Track total value, returns, and daily changes
- **Asset Allocation Visualization**: Interactive pie chart showing portfolio composition
- **Performance Charts**: Historical portfolio value trends with area charts
- **Asset Details**: Individual asset performance, prices, and contributions
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui components
- **Market Data Integration**: Fetches live data from Yahoo Finance API
- **Database Storage**: Persistent storage using PostgreSQL with Drizzle ORM

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Recharts** for data visualization
- **Framer Motion** for animations
- **React Query** for data fetching and caching

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Yahoo Finance API** for market data
- **Zod** for API validation

### Development Tools
- **tsx** for TypeScript execution
- **Vite** for development server
- **Drizzle Kit** for database migrations

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Usage

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run check
```

### Database Migrations
```bash
npm run db:push
```

## API Endpoints

### Portfolio Analytics
- `GET /api/portfolio/analytics` - Get portfolio summary, assets, and historical data

### Market Data
- `GET /api/market/:symbol` - Get historical market data for a specific symbol

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── ...
├── server/                 # Backend Express application
│   ├── db.ts              # Database configuration
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── ...
├── shared/                 # Shared types and schemas
│   ├── routes.ts          # API route definitions
│   └── schema.ts          # Database schema
└── package.json           # Project dependencies and scripts
```

## Key Components

### Dashboard
The main dashboard displays:
- Portfolio summary metrics (total value, returns, daily change)
- Asset allocation pie chart
- Portfolio performance area chart
- Asset table with individual performance details

### Data Flow
1. Frontend makes API calls using React Query
2. Backend fetches market data from Yahoo Finance (with fallback to mock data)
3. Data is stored in PostgreSQL database
4. Analytics calculations are performed server-side
5. Results are returned as JSON and visualized in charts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## License

MIT License - see LICENSE file for details
