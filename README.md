# 💰 Expense Tracker — MERN Stack

A full-stack **Expense Tracker Web Application** built using the MERN stack. It helps users manage their income and expenses, organize transactions by category, monitor their financial balance, and manage their accounts securely.

The project includes a backend API, a client-side application, and an admin application.

**GitHub Repository:** https://github.com/bikram-pal2025/clone-expense-traker
**Live Demo:** https://expencive-traker-delta.vercel.app
**Contuct:** bikram.pal.dev2026@gmail.com


---

## 📌 Table of Contents

* About the Project
* Features
* Technologies Used
* Project Structure
* Prerequisites
* Installation and Setup
* Backend Setup
* Client Setup
* Admin Setup
* Environment Variables
* API Routes
* Authentication
* Email Configuration
* Vercel Configuration
* Deployment
* Git Commands
* Troubleshooting
* Author

---

## 🚀 About the Project

The Expense Tracker is a MERN stack application designed to make personal financial management easier.

Users can register for an account, verify their email using OTP, log in securely, manage their profiles, and record income and expenses. The application calculates financial summaries using transaction data.

The project uses MongoDB for data storage, Express.js and Node.js for the backend, and React.js for the frontend.

---

## ✨ Features

### 👤 User Authentication

* User registration and login
* Email verification using OTP
* Password reset using OTP
* JWT-based authentication
* Access token and refresh token handling
* Protected routes
* Cookie-based refresh token handling

### 💸 Transaction Management

* Create income and expense transactions
* View transaction history
* Delete individual transactions
* Organize transactions by category
* Display transaction details

### 📊 Financial Dashboard

* Display total income
* Display total expenses
* Calculate current balance
* Display transaction summaries
* View recent transactions

### 👨‍💻 Profile Management

* View user profile
* Update profile information
* Manage account details
* Handle user-specific data

### 📧 Email Services

* OTP verification emails
* Password reset emails
* Resend email integration
* Google APIs integration where configured

### 🛡️ Security

* Password hashing
* JWT authentication middleware
* Protected API endpoints
* Environment variable configuration
* HTTP-only refresh token cookies

---

## 🛠️ Technologies Used

### Frontend — Client and Admin

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* Axios
* React Router DOM
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt / bcryptjs (depending on the installed package)
* dotenv
* CORS
* Cookie Parser
* Resend
* Google APIs (`googleapis`)

### Development Tools

* Git
* GitHub
* Visual Studio Code
* Postman
* MongoDB Atlas
* Vercel
* Render

> The actual dependencies are defined in each application's `package.json`. Refer to those files for the exact installed packages and versions.

---

## 📂 Project Structure

The repository may contain the application inside the `expencive-Traker` directory. The expected application structure is:

```text
clone-expense-traker/
│
├── README.md
│
└── expencive-Traker/
    │
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── config/
    │   ├── services/
    │   ├── package.json
    │   └── server.js
    │
    ├── clint/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   ├── vite.config.js
    │   └── vercel.json
    │
    └── admin/
        ├── src/
        ├── public/
        └── package.json
```

Folder names and files may differ slightly depending on your current project.

---

## ⚙️ Prerequisites

Install the following before running the application:

* Node.js and npm
* Git
* MongoDB Atlas account or a local MongoDB server
* Code editor such as Visual Studio Code
* Postman (optional, for testing APIs)

Check your installation:

```bash
node -v
npm -v
git --version
```

---

## 📥 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bikram-pal2025/clone-expense-traker.git
```

Navigate into the repository:

```bash
cd clone-expense-traker
```

If the application is inside the nested `expencive-Traker` folder:

```bash
cd expencive-Traker
```

### 2. Install Backend Dependencies

Open a terminal in the backend folder:

```bash
cd backend
npm install
```

### 3. Install Client Dependencies

Open a separate terminal from the application root:

```bash
cd clint
npm install
```

### 4. Install Admin Dependencies

Open another terminal from the application root:

```bash
cd admin
npm install
```

Each application has its own `package.json`, so dependencies must be installed separately in each folder.

---

## 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory.

Example:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_configured_sender_email
```

Use the exact variable names expected by your source code. If your code uses `MONGO_URI`, `JWT_SECRET_KEY`, or different email variable names, configure those names instead.

Start the backend using the script defined in `backend/package.json`. Common commands are:

```bash
npm run dev
```

or:

```bash
npm start
```

The local backend URL is:

```text
http://localhost:8000
```

---

## 💻 Client Setup

Navigate to the client folder:

```bash
cd clint
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the client directory if your Vite application reads the backend URL from an environment variable.

Example:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Use the variable name actually referenced in your source code. For example, if your code uses `VITE_API_URL`, configure that instead.

Start the client:

```bash
npm run dev
```

Vite will display the local development URL in the terminal, commonly:

```text
http://localhost:5173
```

---

## 🖥️ Admin Setup

Navigate to the admin folder:

```bash
cd admin
```

Install dependencies:

```bash
npm install
```

If the admin application calls the backend, configure its backend URL using the environment variable expected by its code.

Example:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Start the admin application:

```bash
npm run dev
```

Use the local URL displayed by Vite.

---

## 📦 Packages and Installation Commands

### Backend Packages

| Package                | Purpose                         |
| ---------------------- | ------------------------------- |
| `express`              | Backend server and routing      |
| `mongoose`             | MongoDB object modeling         |
| `dotenv`               | Load environment variables      |
| `cors`                 | Configure cross-origin requests |
| `jsonwebtoken`         | Generate and verify JWTs        |
| `bcrypt` or `bcryptjs` | Password hashing                |
| `cookie-parser`        | Read cookies in requests        |
| `resend`               | Send emails through Resend      |
| `googleapis`           | Integrate with Google APIs      |

Install the packages that your backend actually imports:

```bash
cd backend
npm install express mongoose dotenv cors jsonwebtoken cookie-parser resend googleapis
```

If your source uses `bcryptjs`:

```bash
npm install bcryptjs
```

If it uses `bcrypt` instead, install that package instead:

```bash
npm install bcrypt
```

For development with automatic server restarting, if your project uses nodemon:

```bash
npm install --save-dev nodemon
```

### Client Packages

| Package            | Purpose                           |
| ------------------ | --------------------------------- |
| `react`            | Build the user interface          |
| `react-dom`        | Render React components           |
| `vite`             | Development server and build tool |
| `axios`            | Send HTTP requests                |
| `react-router-dom` | Client-side navigation            |
| `react-toastify`   | Display toast notifications       |
| `tailwindcss`      | Utility-first CSS styling         |

Install any missing dependencies from the client folder:

```bash
cd clint
npm install react react-dom axios react-router-dom react-toastify
```

For a Vite React project, if Vite is not already installed:

```bash
npm install --save-dev vite
```

Install Tailwind CSS according to the version and configuration used by your project.

### Admin Packages

The admin application may use React, Vite, Axios, React Router DOM, Tailwind CSS, and React Toastify.

From the admin folder:

```bash
cd admin
npm install
```

Running `npm install` is preferred because it installs the dependencies already recorded in the admin's `package.json`.

> Avoid reinstalling all packages unnecessarily. Existing `package.json` and lock files should be used to reproduce the project's dependency setup.

---

## 🔐 Environment Variables

Environment files contain configuration and sensitive credentials.

### Backend `.env`

Example variable names:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_configured_sender_email
```

Depending on your implementation, email configuration may require additional Google OAuth credentials or other variables.

### Client `.env`

```env
VITE_BACKEND_URL=http://localhost:8000
```

### Admin `.env`

```env
VITE_BACKEND_URL=http://localhost:8000
```

These frontend examples assume your source code uses `VITE_BACKEND_URL`. Change the names to match the variables used in your code.

### Environment File Rules

* Never commit actual `.env` files.
* Never publish database passwords, API keys, OAuth client secrets, or JWT secrets.
* Add `.env.example` files containing placeholder values.
* Configure production variables in the hosting provider's environment settings.
* Remember that Vite variables prefixed with `VITE_` are exposed to browser code and must never contain secrets.

Example `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
build/
```

Place `.gitignore` at the appropriate repository level and ensure it covers the backend, client, and admin environment files.

---

## 🔑 Authentication Overview

The application uses JWT-based authentication.

1. Users register with their account details.
2. Email verification is performed using an OTP.
3. Users log in with their credentials.
4. The backend issues an access token and manages a refresh token using an HTTP-only cookie, according to the authentication implementation.
5. Protected API endpoints verify the access token.
6. Password recovery uses an email-based OTP flow.

Access tokens and refresh tokens should be handled according to the backend's authentication design. Never expose private signing secrets in frontend code.

---

## 🔌 API Routes

The following routes reflect the endpoint names used in the project. Confirm the exact HTTP methods and request bodies in your route files.

### Authentication

| Endpoint                    | Purpose                  |
| --------------------------- | ------------------------ |
| `/api/auth/login`           | User login               |
| `/api/auth/verify-email`    | Verify email OTP         |
| `/api/auth/resend-otp`      | Resend verification OTP  |
| `/api/auth/forget-password` | Password recovery        |
| `/api/auth/refreshToken`    | Refresh access token     |
| `/api/auth/user-check`      | Check authenticated user |

### Profile

| Endpoint                      | Purpose                        |
| ----------------------------- | ------------------------------ |
| `/api/profile/get-me`         | Get the current user's profile |
| `/api/profile/update-profile` | Update profile information     |

### Transactions

| Endpoint                                   | Purpose                    |
| ------------------------------------------ | -------------------------- |
| `/api/transation/create-transation`        | Create a transaction       |
| `/api/transation/get-transation`           | Retrieve transactions      |
| `/api/transation/deleteone-transation/:id` | Delete a transaction by ID |
| `/api/transation/summary`                  | Retrieve financial summary |

### Categories

| Endpoint                          | Purpose                          |
| --------------------------------- | -------------------------------- |
| `/api/category/get-category-user` | Retrieve categories for the user |

The transaction route uses the spelling `transation` in the current implementation. Keep the spelling consistent with the backend routes and frontend API requests unless you deliberately rename it in both places.

---

## 📧 Email Configuration

The project can use Resend to send verification and password recovery emails.

Install the package in the backend if needed:

```bash
cd backend
npm install resend
```

Configure the appropriate environment variables in your backend `.env` file:

```env
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_configured_sender_email
```

The sender address must be permitted by your Resend account. Production sending may require domain verification.

If the project uses Google APIs for email functionality, install the dependency:

```bash
npm install googleapis
```

Configure the Google credentials and OAuth settings required by your implementation. Do not publish OAuth client secrets or refresh tokens.

---

## 🌐 Vercel Configuration

For a React single-page application using React Router, create `vercel.json` in the deployed frontend's root directory.

Example:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This rewrite allows frontend routes to load the React application when a user refreshes or opens a route directly.

If Vercel's Root Directory is set to `clint`, keep `vercel.json` inside `clint`. If the admin application is deployed separately and needs the same behavior, configure its deployment separately.

---

## 🚀 Deployment

### Backend Deployment

The backend can be deployed to Render.

1. Push the source code to GitHub.
2. Create a Web Service on Render.
3. Select the correct repository.
4. Configure the backend root directory.
5. Set the build command, commonly `npm install`.
6. Set the start command according to `backend/package.json`, commonly `npm start`.
7. Add production environment variables in Render.
8. Configure CORS to allow requests from your deployed client and admin URLs.
9. Deploy and verify the API.

### Client Deployment

The client can be deployed to Vercel or another supported hosting platform.

1. Import the GitHub repository.
2. Set the Root Directory to `clint` if that is where the frontend is located.
3. Configure the build command and output directory according to the Vite project.
4. Set the production backend URL in the frontend environment variables.
5. Deploy and test navigation and API requests.

For Vite, the usual build command is:

```bash
npm run build
```

The usual output directory is:

```text
dist
```

### Admin Deployment

Deploy the admin application separately if it is a separate frontend.

1. Select the repository.
2. Set the Root Directory to `admin`.
3. Configure its build settings.
4. Add its production backend URL.
5. Deploy and test the application.

### Production Checklist

* Set the correct backend URL in both frontend applications.
* Configure CORS for the actual deployed origins.
* Configure secure cookie settings for cross-origin authentication where required.
* Ensure MongoDB allows the deployed backend to connect.
* Configure production email credentials.
* Test login, OTP verification, password recovery, transactions, and profile updates.
* Verify that the deployed frontend uses HTTPS.

---

## 🧪 Testing

You can test backend endpoints with Postman or another API client.

Verify these workflows:

* User registration
* Email verification
* Login and protected API access
* Refresh token behavior
* Password recovery
* Profile retrieval and updates
* Transaction creation, retrieval, and deletion
* Financial summary
* Email delivery

---

## 🛠️ Troubleshooting

### MongoDB Connection Error

Check the MongoDB connection string, database credentials, network access rules, and backend environment variables.

### CORS Error

Make sure the backend permits the exact origins of the deployed client and admin applications. Check whether credentials are enabled when using cookies.

### Email Sending Error

Verify your Resend API key, sender address, domain verification requirements, and production environment configuration.

### Page Returns 404 After Refresh

For a Vite React Router application deployed to Vercel, verify the `vercel.json` rewrite configuration and Root Directory.

### Missing Package Error

Run the following command in the application folder that reported the error:

```bash
npm install
```

If a particular package is missing, install it in the correct folder.

### Git Push Rejected

Fetch or pull remote changes and resolve any merge conflicts before pushing. Avoid force-pushing unless you deliberately intend to replace remote history.

---

## 👨‍💻 Author

**Bikram Pal**

* GitHub: https://github.com/bikram-pal2025
* LinkedIn: https://www.linkedin.com/in/bikram-pal-876432325/

---

## 📄 License

No license is specified in this README. Add a license file if you intend to grant others explicit permission to use, modify, or distribute the project.

---

⭐ If you find this project useful, you can star the repository on GitHub.
