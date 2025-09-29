# Frontend - SIH Waste Sorting Game

React-based frontend application for the waste sorting game with TypeScript, Vite, and Tailwind CSS.

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## 🚀 Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:3000

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Development Configuration
VITE_DEV_MODE=true
```

### Production Environment

For production deployment, update the environment variables:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_DEV_MODE=false
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.tsx
│   ├── GamePage.tsx
│   ├── LoginPage.tsx
│   ├── RegistrationPage.tsx
│   ├── LeaderboardPage.tsx
│   ├── ResultsPage.tsx
│   ├── ProfilePage.tsx
│   ├── RewardsPage.tsx
│   ├── ChampionsPage.tsx
│   ├── InstructionsPage.tsx
│   ├── Navbar.tsx
│   ├── WasteItem.tsx
│   └── Dustbin.tsx
├── services/            # API service layer
│   └── api.ts
├── data/               # Static data
│   └── wasteItems.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── vite-env.d.ts       # Vite type definitions
```

## 🎮 Features

### Game Components

- **WasteItem**: Draggable waste items with different categories
- **Dustbin**: Drop zones for different waste types
- **GamePage**: Main game logic and state management
- **ResultsPage**: Score display and leaderboard submission

### User Management

- **LoginPage**: User authentication
- **RegistrationPage**: New user registration
- **ProfilePage**: User profile and statistics

### Navigation

- **HomePage**: Landing page with game overview
- **Navbar**: Navigation between different sections
- **LeaderboardPage**: Global and local leaderboards

## 🔧 API Integration

The frontend communicates with the backend through a centralized API service (`src/services/api.ts`):

### API Service Methods

```typescript
// Authentication
apiService.login(credentials)
apiService.register(userData)
apiService.logout()

// User management
apiService.getUser(userId)
apiService.updateUser(userId, userData)

// Scores
apiService.getScores(userId?)
apiService.submitScore(scoreData)
apiService.getLeaderboard(gameType?)

// Health check
apiService.healthCheck()
```

## 🎨 Styling

The project uses Tailwind CSS for styling with:

- Responsive design patterns
- Custom color schemes
- Gradient backgrounds
- Smooth animations and transitions
- Component-based styling

### Key Design Elements

- Green/teal color scheme for environmental theme
- Card-based layouts with backdrop blur effects
- Smooth hover and focus transitions
- Mobile-first responsive design

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` directory with optimized static files.

### Deployment Options

1. **Netlify**
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Vercel**
   - Import your repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **GitHub Pages**
   - Build locally: `npm run build`
   - Deploy the `dist/` directory

### Environment Variables for Production

Make sure to set the production API URL:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🔍 Troubleshooting

### Common Issues

1. **API calls failing**
   - Check that `VITE_API_URL` is correctly set
   - Ensure the backend is running and accessible
   - Check browser console for CORS errors

2. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors: `npm run lint`
   - Ensure all imports are correct

3. **Styling issues**
   - Verify Tailwind CSS is properly configured
   - Check that PostCSS is processing styles correctly
   - Clear browser cache for style updates

### Development Tips

- Use React Developer Tools for debugging
- Check the Network tab for API request/response details
- Use `console.log` for debugging state changes
- Utilize TypeScript for catching errors early

## 🧪 Testing

While not currently implemented, recommended testing setup:

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Add test scripts to package.json
"test": "vitest"
"test:ui": "vitest --ui"
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)