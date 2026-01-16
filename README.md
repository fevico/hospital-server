# GIS-Integrated Hospital Dashboard

A full-stack mini-dashboard application that visualizes hospital locations and ambulance proximity using spatial data and GIS techniques. Built as part of a technical assessment to demonstrate full-stack skills with React, Leaflet, NestJS, TypeORM, PostgreSQL + PostGIS, and TanStack Query.

## Features

- **Spatial Database** with PostgreSQL + PostGIS
  - At least 10 mock hospitals and 5 ambulances seeded in Lagos, Nigeria area
  - Ambulance locations can be manually updated via API to simulate movement

- **Interactive Map** (Frontend)
  - React + Leaflet map displaying all hospitals as clickable markers
  - Clicking a hospital marker shows hospital details + nearest ambulance (with distance in km)
  - Uses spatial backend query for accurate proximity calculation

- **Proximity Logic**
  - Backend calculates nearest ambulance using PostGIS spatial functions (`ST_Distance` with geography type)
  - Cached results (Redis) for repeated queries → no repeated DB hits (satisfies "Grit Challenge")

- **Ambulance Management**
  - List view of all ambulances with status and current location
  - "Move Randomly" button on each ambulance card → updates coordinates via API (simulates real-time movement)
  - Updates reflect immediately in the list and affect nearest-ambulance calculations on the map

- **Backend Tech**
  - NestJS + TypeScript
  - TypeORM with PostGIS geometry support
  - Redis caching for proximity queries
  - Neon-hosted PostgreSQL


## Setup & Running

### Prerequisites

- Node.js ≥ 18
- PostgreSQL (Neon serverless used here)
- Redis (local or cloud)
- Git

### Backend (NestJS)

1. Navigate to backend folder:
   ```bash
   cd server

2. Install dependencies:Bashnpm install
3. Create .env file (use your Neon credentials):envDATABASE_URL=postgresql://...    @ep-...neon.tech/neondb?sslmode=require
4. Start development server (auto-seeds data on startup):Bashnpm run start:devAPI available at: http://localhost:3000Endpoints:
GET /hospitals → list hospitals
GET /ambulances → list ambulances
PUT /ambulances/:id/location → update ambulance position { "lat": 6.55, "lng": 3.39 }
GET /ambulances/nearest/:hospitalId → nearest ambulance + distance