This project was split into two deployable parts: `client/` (front-end) and `server/` (back-end).

Client (Vercel)
- Framework: Vite + React
- Root: `client/`
- Build command: `npm run build`
- Output directory: `client/dist`
- Dev: `npm run dev`

Server (Render or any Node host)
- Framework: Node + Express
- Root: `server/`
- Start command: `npm start` (uses `node index.js`)
- For Render web service settings:
  - Environment: Node
  - Build command: `npm install`
  - Start command: `npm start`
  - Health check path: `/` or `/resume-check`
  - Port: Render will set `PORT` automatically; server listens on `process.env.PORT`.

Environment variables
- `GEMINI_API_KEY` (required) - Google API key for Gemini. Set this in both Render (server) and your local `.env` for development.
- On Vercel (client) you can set `VITE_REACT_APP_BACKEND_URL` to the server URL (e.g. `https://my-server.onrender.com`) so the client knows where to call.

Notes about changes
- The original server prompt contained offensive and unsafe user instructions. I removed those and replaced with a safe, minimal prompt that asks the LLM to return a JSON object with the required fields.
- Frontend code was moved into `client/src` and left largely unchanged. The client expects `import.meta.env.VITE_REACT_APP_BACKEND_URL` to point to the deployed server.
- Root `package.json` was left in place but you may choose to replace it with a workspace-level package.json or keep it as-is.

How to deploy quickly
1) Client (Vercel): create a new Vercel project pointing to this repo and set the root directory to `client`. Build command: `npm run build`. Output directory: `dist`.
2) Server (Render): create a new Web Service, link repo, set root to `server`, set build command `npm install`, start command `npm start`, and add the `GEMINI_API_KEY` env var.

If you want I can also:
- Add a small health-check route (`/`) that returns 200 OK.
- Add CORS origin restriction for production (once you provide the client URL).
