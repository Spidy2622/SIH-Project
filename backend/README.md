# Backend - SIH Waste Sorting Game API

Express.js backend API for the waste sorting game with TypeScript, MongoDB, and user authentication.

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚀 Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local installation or cloud instance)

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sih-project
   MONGO_DB_NAME=User_db
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The API will be available at http://localhost:5000

## 📜 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (requires build first)

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/sih-project
MONGO_DB_NAME=User_db

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# JWT Configuration (if implementing JWT)
# JWT_SECRET=your-secret-key-here
# JWT_EXPIRES_IN=7d
```

### Production Environment

For production deployment:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
```

## 🏗️ Project Structure

```
src/
├── models/              # Mongoose models
│   ├── User.ts
│   └── Score.ts
├── routes/              # Express route handlers
│   ├── auth.ts
│   ├── users.ts
│   └── scores.ts
└── index.ts             # Application entry point
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "registrationDate": "string",
  "totalScore": 0,
  "gamesPlayed": 0,
  "achievements": []
}
```

#### POST `/api/auth/login`
Authenticate a user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "registrationDate": "string",
  "totalScore": 100,
  "gamesPlayed": 5,
  "achievements": []
}
```

### User Routes (`/api/users`)

#### GET `/api/users/:id`
Get user details by ID.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "registrationDate": "string",
  "totalScore": 100,
  "gamesPlayed": 5,
  "achievements": []
}
```

### Score Routes (`/api/scores`)

#### POST `/api/scores`
Submit a game score.

**Request Body:**
```json
{
  "userId": "string",
  "score": 100,
  "gameType": "waste-sorting"
}
```

**Response:**
```json
{
  "id": "string",
  "userId": "string",
  "name": "string",
  "score": 100,
  "level": 1,
  "date": "2024-01-01T00:00:00.000Z"
}
```

#### GET `/api/scores/leaderboard`
Get the leaderboard (top 50 scores).

**Response:**
```json
[
  {
    "id": "string",
    "userId": "string",
    "name": "string",
    "score": 100,
    "level": 1,
    "date": "2024-01-01T00:00:00.000Z"
  }
]
```

### Health Check (`/api/health`)

#### GET `/api/health`
Check if the API is running.

**Response:**
```json
{
  "ok": true
}
```

## 🗄️ Database Models

### User Model

```typescript
interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  ward?: string;
  society?: string;
  registrationDate: string;
  totalScore: number;
  gamesPlayed: number;
  achievements: Array<{ id: string; title: string }>;
}
```

### Score Model

```typescript
interface IScore {
  userId: mongoose.Types.ObjectId;
  name: string;
  score: number;
  level: number;
  date: string;
}
```

## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs with salt rounds
- **CORS Protection**: Configured for specific frontend origins
- **Input Validation**: Basic validation on required fields
- **Error Handling**: Centralized error responses

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This compiles TypeScript files to the `dist/` directory.

### Deployment Options

1. **Heroku**
   ```bash
   # Install Heroku CLI and login
   heroku create your-app-name
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set FRONTEND_URL=your-frontend-url
   git push heroku main
   ```

2. **Railway**
   - Connect your repository
   - Set environment variables in the dashboard
   - Deploy automatically on push

3. **DigitalOcean App Platform**
   - Create a new app from your repository
   - Configure environment variables
   - Set build and run commands

### Environment Variables for Production

Ensure these are set in your production environment:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
```

## 🔧 Database Setup

### Local MongoDB

1. **Install MongoDB**
   - Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Windows
   net start MongoDB
   
   # On Linux
   sudo systemctl start mongod
   ```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and add to `.env`
4. Whitelist your IP address

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB connection failed**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   - Ensure MongoDB is running locally
   - Check connection string in `.env`
   - Verify network access for cloud databases

2. **CORS errors**
   ```
   Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked
   ```
   - Check `FRONTEND_URL` in `.env`
   - Ensure CORS is properly configured

3. **Port already in use**
   ```
   Error: listen EADDRINUSE: address already in use :::5000
   ```
   - Change `PORT` in `.env`
   - Kill process using the port: `lsof -ti:5000 | xargs kill`

4. **TypeScript compilation errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for syntax errors in TypeScript files
   - Verify `tsconfig.json` configuration

### Development Tips

- Use MongoDB Compass for database visualization
- Check server logs for detailed error messages
- Use Postman or similar tools for API testing
- Enable debug logging in development

## 🧪 Testing

Recommended testing setup (not currently implemented):

```bash
# Install testing dependencies
npm install --save-dev jest @types/jest supertest @types/supertest

# Add test scripts to package.json
"test": "jest"
"test:watch": "jest --watch"
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)