## EduConnect

**EduConnect** is a modern e-learning portal built with **Next.js (App Router)**, **Tailwind CSS**, and **MongoDB**. It supports course catalogs, lessons, quizzes, progress tracking, and secure payments with a responsive, accessible UI.

## Features

- Real-time Weather Conditions (via OpenWeatherMap API)
- Auto Location Detection (via Geolocation API)
- Wind Speed & Direction
- Temperature Info with min/max details
- Air Quality Index & Pollution Details
- Location Switcher with 40+ cities
- Local Time & Date based on coordinates
- Beautiful UI with background imagery
- Dynamic route-based architecture with `<ParallelLayout />`
- Modular and reusable components
- Fully responsive design for all screen sizes

## Screenshots

![Ecovista Screenshot](./ecovista.PNG)

## Tech Stack

- **Next.js (App Router)**
- **Tailwind CSS**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Stripe** (payment integration)
- **Cloudinary** (file uploads)

## Installation

Follow these steps to set up the project locally:

# 1. Clone the repository

```
git clone https://github.com/khandoker-tahmid-sami/educonnect.git
cd educonnect
```

# 2. Install project dependencies

```
npm install
```

# 3. Configure environment variables

```
MONGO_URI = your_mongodb_uri

GOOGLE_CLIENT_ID = your_google_client_id

GOOGLE_CLIENT_SECRET = your_google_client_secret

GITHUB_CLIENT_ID = your_github_client_id

GITHUB_CLIENT_SECRET = your_github_client_secret

AUTH_SECRET = your_auth_secret

AUTH_TRUST_HOST=true

STRIPE_PUBLISHABLE_KEY = your_stripe_publishable_key

STRIPE_SECRET_KEY = your_stripe_secret_key

NODEMAILER_EMAIL = your_email

NODEMAILER_APP_PASS = your_app_pass
```

# 4. Start the development server

```
npm run dev
```

# 5. Open yout browser and go to

```
http://localhost:3000
```
