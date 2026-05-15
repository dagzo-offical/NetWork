# API (NestJS)

Core endpoints (planned):

- `POST /auth/login`
- `GET /courses/:sectionId/lessons/:lessonId`
- `POST /attempts/mini/start`
- `POST /attempts/mini/submit`
- `POST /attempts/final/start`
- `POST /attempts/final/submit`
- `GET /attempts/:id/cooldown`

Security controls:
- JWT auth
- secure cookies
- rate limiting
- abuse protection on AI endpoints
