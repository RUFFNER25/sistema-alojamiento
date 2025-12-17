# Configuración de GitHub Actions

## Secretos Necesarios

### Para Docker Registry (si usas Docker Hub o similar):

1. **DOCKER_REGISTRY**
   - Si usas Docker Hub: `docker.io` o deja vacío
   - Si usas GitHub Container Registry: `ghcr.io`
   - Si usas otro: la URL del registry

2. **DOCKER_USERNAME**
   - Tu usuario de Docker Hub o del registry

3. **DOCKER_PASSWORD**
   - Tu contraseña o token de acceso

### Para Terraform (si usas AWS u otro cloud):

4. **AWS_REGION**
   - Ejemplo: `us-east-1`, `eu-west-1`

5. **AWS_AMI**
   - ID de la imagen AMI que quieres usar

## Pasos para Configurar

### 1. Crear Secretos en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Agrega cada secreto uno por uno:

```
DOCKER_REGISTRY = docker.io (o ghcr.io)
DOCKER_USERNAME = tu-usuario-docker
DOCKER_PASSWORD = tu-password-o-token
AWS_REGION = us-east-1 (si usas AWS)
AWS_AMI = ami-xxxxx (si usas AWS)
```

### 2. Opciones de Docker Registry

#### Opción A: Docker Hub (Gratis)
- **DOCKER_REGISTRY**: `docker.io` o déjalo vacío
- **DOCKER_USERNAME**: Tu usuario de Docker Hub
- **DOCKER_PASSWORD**: Tu contraseña de Docker Hub

#### Opción B: GitHub Container Registry (Recomendado, Gratis)
- **DOCKER_REGISTRY**: `ghcr.io`
- **DOCKER_USERNAME**: Tu usuario de GitHub
- **DOCKER_PASSWORD**: Un Personal Access Token (PAT) con permisos `write:packages`

Para crear un PAT:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Selecciona `write:packages` y `read:packages`
4. Copia el token y úsalo como DOCKER_PASSWORD

### 3. Si NO usas Terraform (Solo VPS)

Si solo quieres desplegar en una VPS sin Terraform, puedes modificar el workflow para:
- Construir las imágenes Docker
- Hacer SSH a tu VPS
- Ejecutar docker-compose

### 4. Verificar que Funciona

1. Haz un push a la rama `main`
2. Ve a la pestaña **Actions** en GitHub
3. Verás el workflow ejecutándose
4. Si hay errores, revisa los logs

## Flujo del Workflow

1. **build-and-test**: Instala dependencias y ejecuta tests
2. **docker-build-and-push**: Construye y sube imágenes Docker
3. **terraform-deploy**: Despliega con Terraform (opcional)

## Personalización

Puedes modificar el archivo `.github/workflows/ci-cd.yml` según tus necesidades.

