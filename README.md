# 🅿 Sofia Parking Finder

A web application that helps people in Sofia, Bulgaria find parking places around the city.

## Features

- 🗺 **Interactive Map** – Leaflet-powered map centred on Sofia showing all parking locations
- 🔵 **Payment Zones** – Blue Zone, Green Zone, Yellow Zone with real-time paid/free status based on current day and time
- 🆓 **Free & Paid Parking** – Clear indicators and hourly rates for all zones (Mon–Sat schedules, Sunday always free)
- 🏘 **Residential Parking** – Parking between buildings with resident-priority information
- 📅 **Event Synchronisation** – Venues (Arena Sofia, Vasil Levski Stadium, NDK, Sofia Tech Park) with parking impact warnings
- ⏰ **Rush Hour Awareness** – Real-time parking pressure indicator (morning/evening rush, Saturday shopping, weekday vs weekend)
- 🧭 **Navigation** – One-tap Google Maps navigation from any parking spot
- 🔖 **Save My Spot** – Save any parking location (or your GPS position) to find your car later; persisted in localStorage
- 🔍 **Search** – Find parking by name, address or nearby landmark

## Tech Stack

- React 19 + Vite 8
- Leaflet / react-leaflet for maps
- CSS Modules for styling
- LocalStorage for saved spots

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Build

```bash
npm run build
npm run preview
```
