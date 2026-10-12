# Smart Campus Opportunities — Backend

Spring Boot 3.5.4 / Java 21 backend for the Smart Campus frontend.

## Before running

This backend uses MySQL. Keep your credentials in a local file and do not commit passwords or JWT secrets to Git.

In PowerShell, from the `backend` folder, create your private config file:

```powershell
Copy-Item .env.local.example .env.local
notepad .env.local
```

Replace `DB_PASSWORD` with your local MySQL password. Set `DB_USERNAME` if you do not use `root`. Replace `JWT_SECRET` with a private random value at least 32 bytes long. `.env.local` is ignored by Git. The backend defaults to port 8081 when `PORT` is not set; the frontend API base URL defaults to `http://localhost:8081/api`.

## CORS

CORS allows local Vite origins `http://localhost:5173`, `http://localhost:5174`, and `http://localhost:5175`. If Vite chooses another port, add that exact origin in `src/main/java/com/smartcampus/backend/config/SecurityConfig.java` and restart the backend.

## Demo admin

On startup, a demo admin is created if it does not already exist:

- Email: `admin@smartcampus.com`
- Password: `Admin@123`

Change this password and avoid using demo credentials in a public deployment.

## Run

Requires JDK 21, Maven, and a reachable MySQL database. In the same PowerShell window where the environment variables above are set, run from this folder:

```powershell
mvn spring-boot:run
```

Tables are managed by Hibernate (`ddl-auto=update`). The initializer inserts the demo admin and seven opportunities linked to official program pages if they are not already present. No fake student accounts are created; students register with their own details. `GET /api/health` checks the live MySQL connection.

## API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/health`
- `GET/PUT /api/profile`
- `GET /api/student/opportunities`
- `GET /api/student/saved` and `POST/DELETE /api/student/saved/{id}`
- `GET /api/student/applications` and `POST /api/student/applications/{id}`
- `GET/POST /api/admin/opportunities`, `PUT/DELETE /api/admin/opportunities/{id}`
- `GET /api/admin/dashboard`, `GET /api/admin/students`
