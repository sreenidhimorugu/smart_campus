# Smart Campus Opportunities – Updated Frontend

## What's changed
- Redesigned landing page with a single Smart Campus portal and separate Student / Admin entry cards.
- Student and Admin sign-in are available on one sign-in screen using the role selector.
- Added polished responsive styling for desktop and mobile.
- Added an Admin Profile page using the signed-in account details stored at login.
- Kept the existing student profile, opportunities, saved list, applications, and admin opportunity-management pages.
- Frontend API base URL is `http://localhost:8081/api` to match the local backend port used in this project.

## Run locally
1. Open this folder in VS Code.
2. In Windows PowerShell, run `npm.cmd install`.
3. Run `npm.cmd run dev`.
4. Keep the Spring Boot backend running at `http://localhost:8081`.

If the backend is hosted at another URL, set `VITE_API_BASE_URL` before running Vite, for example:

```powershell
$env:VITE_API_BASE_URL = "http://localhost:8081/api"
npm.cmd run dev
```

## Notes
- The frontend expects the existing backend endpoints under `/api`, including `/auth/login`, `/auth/register`, `/profile`, `/student/opportunities`, `/student/saved`, `/student/applications`, and `/admin/...`.
- If the backend uses different endpoint names or response fields, the related integration will need to be aligned with the backend.
- This ZIP intentionally excludes `node_modules`, `dist`, and `.git`. Install dependencies after extracting it.
