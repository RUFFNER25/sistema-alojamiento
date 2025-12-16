Airbnb Clone - Arquitectura en Microservicios
============================================

Proyecto de ejemplo de un sistema de alojamiento tipo Airbnb con la siguiente arquitectura:

- Backend: Node.js + Express + MongoDB Atlas
- Frontend User: Angular (aplicación para huéspedes)
- Frontend Admin: Angular (aplicación para administradores/hosts)
- Contenedores: Docker (3 servicios)
- Infraestructura: Terraform
- CI/CD: GitHub Actions

## Estructura de carpetas

- `backend/`: API REST con Node/Express
- `frontend-user/`: SPA Angular para usuarios
- `frontend-admin/`: SPA Angular para administración
- `infra/terraform/`: definición de infraestructura como código
- `.github/workflows/`: pipelines de CI/CD
- `docker-compose.yml`: orquestación local de servicios

## Requisitos previos

- Node.js 20+
- Docker y Docker Compose
- Cuenta en MongoDB Atlas
- Cuenta en un registro de contenedores (Docker Hub, GHCR, etc.)

## Variables importantes

En `backend/.env` deberás definir:

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster-url/dbname?retryWrites=true&w=majority
JWT_SECRET=supersecret
```

Para Terraform y GitHub Actions, se usarán variables y secretos que deberás adaptar a tu entorno.


