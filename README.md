# Digital Wallet

### Project Overview
This is a PayTM clone, a full-stack web application that simulates basic digital payment functionality where users can create accounts, maintain balances, and transfer money to other users.

### Technical Stack

**Backend Technologies:**
- Node.js with Express.js framework for the server
- MongoDB with Mongoose ODM for database
- JWT (JSON Web Tokens) for authentication
- Zod for input validation
- CORS for handling cross-origin requests

**Frontend Technologies:**
- React.js (using Vite as build tool)
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- React Hooks (useState, useEffect)

### Core Features

1. **User Authentication:**
   - Sign up with email, password, first name, and last name
   - Sign in with email and password
   - JWT-based authentication system

2. **Account Management:**
   - Each user gets a random initial balance (between 1-10000)
   - Users can view their current balance
   - Profile information can be updated

3. **Money Transfer:**
   - Users can search for other users
   - Transfer money to other users
   - Real-time balance updates
   - Transaction security using MongoDB sessions

4. **User Interface:**
   - Clean, modern UI using TailwindCSS
   - Responsive design
   - User search functionality
   - Dashboard with balance display
   - User-friendly money transfer interface

### Project Structure

```
paytm/
├── backend/               # Backend server code
│   ├── routes/           # API routes
│   ├── middleware.js     # Authentication middleware
│   ├── db.js            # Database configuration
│   └── config.js        # JWT configuration
│
└── frontend/            # React frontend
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Main application pages
    │   └── App.jsx      # Main application component
    └── public/          # Static assets
```

### Key Implementation Features

1. **Security:**
   - Password validation
   - JWT-based authentication
   - Protected routes using middleware

2. **Database Design:**
   - User schema with validation
   - Account schema for balance management
   - Relationship between users and accounts

3. **Transaction Management:**
   - Atomic transactions for money transfers
   - Balance verification before transfers
   - Error handling for insufficient funds

This project serves as a good example of a modern full-stack JavaScript application with practical features like user authentication, real-time updates, and secure money transfers, making it a simplified but functional digital payment system similar to PayTM.