# MoodMuse

A fullstack mood and wellness tracker app.

## Local Development

1. **Backend**
   - `cd backend`
   - `npm install`
   - Copy `.env.example` to `.env` and fill in your secrets
   - `npm run dev`

2. **Frontend**
   - `cd frontend`
   - `npm install`
   - Create `.env` with `VITE_API_URL=http://localhost:5000/api`
   - `npm run dev`

3. Visit [http://localhost:5173](http://localhost:5173)

## Docker Compose

1. `cd docker`
2. `docker-compose up --build`
3. Frontend: [http://localhost:5173](http://localhost:5173)
4. Backend: [http://localhost:5000](http://localhost:5000)

## Testing

- Backend: `cd backend && npm test`

## Folder Structure
- See docs/ for API and deployment details. 