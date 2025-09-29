# SIH-Project - Waste Sorting Game

A full-stack web application featuring an interactive waste sorting game built with React and Express.js. This project promotes environmental awareness through gamification.

## 🏗️ Project Structure

```
SIH-Project/
├── frontend/          # React frontend application
├── backend/           # Express.js backend API
├── package.json       # Workspace configuration
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SIH-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   
   # Edit backend/.env with your MongoDB connection string
   # Edit frontend/.env if needed (defaults should work for development)
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) simultaneously.

## 📜 Available Scripts

### Root Level Commands

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server
- `npm run build:frontend` - Build only the frontend
- `npm run build:backend` - Build only the backend
- `npm run start` - Start the production backend server

### Individual Project Commands

See the README files in `frontend/` and `backend/` directories for project-specific commands.

## 🌐 Deployment

### Frontend Deployment

The frontend builds to static files and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Build output is in `frontend/dist/` after running `npm run build:frontend`.

### Backend Deployment

The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean App Platform
- Any Node.js hosting service

Make sure to set the following environment variables in production:
- `MONGODB_URI` - Your MongoDB connection string
- `FRONTEND_URL` - Your frontend domain for CORS
- `PORT` - Server port (usually set by hosting provider)

## 🔧 Development

### Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript + MongoDB + Mongoose
- **Communication**: RESTful API with CORS enabled

### API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/:id` - Get user details
- `POST /api/scores` - Submit game score
- `GET /api/scores/leaderboard` - Get leaderboard

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sih-project
MONGO_DB_NAME=User_db
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_DEV_MODE=true
```

## 🎮 Features

- Interactive waste sorting game
- User registration and authentication
- Score tracking and leaderboards
- Responsive design
- Real-time game mechanics
- Achievement system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in backend/.env or kill the process using the port
2. **MongoDB connection failed**: Ensure MongoDB is running and the connection string is correct
3. **CORS errors**: Check that FRONTEND_URL in backend/.env matches your frontend URL
4. **Build failures**: Ensure all dependencies are installed with `npm install`

### Getting Help

- Check the individual README files in `frontend/` and `backend/` directories
- Review the console logs for specific error messages
- Ensure all environment variables are properly set