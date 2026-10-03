
# Expense Tracker

A full-stack Expense Tracker application built using the MERN stack. It helps users manage their income, expenses, transactions, and categories.

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- JWT Authentication

## Project Structure

```text
expencive-Traker/
├── backend/    # Node.js and Express.js API
├── clint/      # React.js frontend
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_PUBLIC_REPOSITORY_URL
cd expencive-Traker
```

### 2. Install Backend Dependencies

Open the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and configure your environment variables.

Example:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by your backend, such as email service credentials.

Start the backend:

```bash
npm run dev
```

Use the start command defined in `backend/package.json` if `npm run dev` is not available.

### 3. Install Frontend Dependencies

Open another terminal from the project root:

```bash
cd clint
npm install
```

Configure the backend API URL in the frontend according to your project's configuration.

For local development, the backend URL is:

```text
http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Installing Packages

- **backend folder:** Run `npm install` to install the packages listed in `backend/package.json`.
- **clint folder:** Run `npm install` to install the packages listed in `clint/package.json`.

You do not need to install every package manually.

## Features

- User registration and login
- Email OTP verification
- Forgot and reset password
- Income and expense tracking
- Transaction management
- Category management
- User profile management
- Financial summary dashboard
- JWT-based authentication

## Environment Variables

Keep your `.env` files private. Never upload database credentials, JWT secrets, or email API keys to GitHub.

## Author

**Bikram Pal**

- GitHub: https://github.com/bikram-pal2025
- LinkedIn: https://www.linkedin.com/in/bikram-pal-876432325/# clone-expense-traker
