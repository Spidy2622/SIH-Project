# Deployment Guide - Vercel

This guide will help you deploy both the frontend and backend to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Step 1: Set up MongoDB Atlas

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Whitelist all IP addresses (0.0.0.0/0) for Vercel deployment

## Step 2: Deploy Backend to Vercel

1. **Login to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy Backend**:
   ```bash
   cd backend
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add these environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `MONGO_DB_NAME`: `User_db`
     - `FRONTEND_URL`: `https://your-frontend-domain.vercel.app`

4. **Note your backend URL**: It will be something like `https://your-backend.vercel.app`

## Step 3: Deploy Frontend to Vercel

1. **Deploy Frontend**:
   ```bash
   cd ../frontend
   vercel
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   - `VITE_API_URL`: Your backend URL from Step 2 (e.g., `https://your-backend.vercel.app/api`)

3. **Update Backend CORS**: Go back to your backend project settings and update:
   - `FRONTEND_URL`: Your actual frontend URL (e.g., `https://your-frontend.vercel.app`)

## Step 4: Test the Deployment

1. Visit your frontend URL
2. Try registering a new user
3. Play the game and submit a score
4. Check the leaderboard

## Alternative: One-Click Deploy

### Deploy Backend
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo&project-name=sih-backend&root-directory=backend)

### Deploy Frontend
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo&project-name=sih-frontend&root-directory=frontend)

## Environment Variables Summary

### Backend (.env or Vercel Environment Variables)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGO_DB_NAME=User_db
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (.env or Vercel Environment Variables)
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `FRONTEND_URL` in backend matches your actual frontend domain
2. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
3. **API Calls Failing**: Check that `VITE_API_URL` points to your backend domain
4. **Build Failures**: Ensure all dependencies are in package.json

### Checking Logs

- **Vercel Dashboard**: Go to your project → Functions tab → Click on any function to see logs
- **Local Testing**: Run `vercel dev` in each directory to test locally

## Custom Domains (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update environment variables with your custom domain

## Automatic Deployments

Once connected to Git:
- Push to main branch → Automatic deployment
- Pull requests → Preview deployments
- Environment variables are inherited automatically