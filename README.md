# Room Rent Management App

A modern, React-based web application for managing room rentals.

## Features

- **Dashboard**: View all rooms and their status at a glance.
- **Room Management**: Add new rooms with different types (Single, Double, Suite, Deluxe) and prices.
- **Booking System**: Book rooms for tenants with check-in and check-out dates.
- **Availability Tracking**: 
  - Visual indicators for Available vs Occupied rooms.
  - "Days left" countdown for occupied rooms.
  - Overdue alerts.
- **Persistence**: Data is saved to **Firebase Firestore** for real-time cloud storage.

## Live Demo

Check out the live application here: [https://room-rent-management-app.web.app/](https://room-rent-management-app.web.app/)

## Documentation

For a detailed guide on how this app was built, including project structure and troubleshooting, please refer to the [Development Guide](./DEVELOPMENT_GUIDE.md).

## Tech Stack

- **React**: UI Library
- **Vite**: Build tool
- **Firebase**: Backend-as-a-Service (Firestore & Hosting)
- **Vanilla CSS**: Custom CSS variables for a premium, dark-mode design.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.
