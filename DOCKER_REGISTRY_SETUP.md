# Configuración de Docker Registry para GitHub Actions

## Opción Recomendada: GitHub Container Registry (ghcr.io)

### Pasos para Configurar:

#### 1. Crear Personal Access Token (PAT)

1. Ve a GitHub.com
2. Click en tu foto de perfil (arriba derecha)
3. **Settings** → **Developer settings** (al final del menú izquierdo)
4. **Personal access tokens** → **Tokens (classic)**
5. Click en **Generate new token** → **Generate new token (classic)**
6. Dale un nombre: `Docker Registry Token`
7. Selecciona los permisos:
   - ✅ `write:packages` (para subir imágenes)
   - ✅ `read:packages` (para leer imágenes)
   - ✅ `delete:packages` (opcional, para eliminar)
8. Click en **Generate token**
9. ⚠️ **COPIA EL TOKEN INMEDIATAMENTE** (solo se muestra una vez)

#### 2. Configurar Secretos en GitHub

En tu repositorio:
1. **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**

Agrega estos 3 secretos:

**Secreto 1:**
- Name: `DOCKER_REGISTRY`
- Value: `ghcr.io`

**Secreto 2:**
- Name: `DOCKER_USERNAME`
- Value: `tu-usuario-de-github` (ejemplo: `ruffner`)

**Secreto 3:**
- Name: `DOCKER_PASSWORD`
- Value: `el-token-que-copiaste` (el PAT que creaste)

### Verificar que Funciona

Después de configurar, cuando hagas push, las imágenes se subirán a:
- `ghcr.io/tu-usuario/airbnb-backend:latest`
- `ghcr.io/tu-usuario/airbnb-frontend-user:latest`
- `ghcr.io/tu-usuario/airbnb-frontend-admin:latest`

---

## Alternativa: Docker Hub

Si prefieres usar Docker Hub:

### 1. Crear cuenta en Docker Hub
- Ve a https://hub.docker.com/signup
- Crea una cuenta gratuita

### 2. Crear Access Token (recomendado en lugar de contraseña)

1. Ve a https://hub.docker.com/settings/security
2. Click en **New Access Token**
3. Dale un nombre: `GitHub Actions`
4. Copia el token generado

### 3. Configurar Secretos

**Secreto 1:**
- Name: `DOCKER_REGISTRY`
- Value: `docker.io` (o déjalo vacío)

**Secreto 2:**
- Name: `DOCKER_USERNAME`
- Value: `tu-usuario-docker-hub`

**Secreto 3:**
- Name: `DOCKER_PASSWORD`
- Value: `el-token-que-copiaste` (o tu contraseña, pero token es más seguro)

---

## ¿Cómo Saber Cuál Usar?

### Usa GitHub Container Registry (ghcr.io) si:
- ✅ Ya usas GitHub
- ✅ Quieres que sea privado por defecto
- ✅ No quieres crear otra cuenta
- ✅ Quieres todo en un solo lugar

### Usa Docker Hub si:
- ✅ Ya tienes cuenta en Docker Hub
- ✅ Quieres que las imágenes sean públicas fácilmente
- ✅ Prefieres un registry separado

---

## Verificar Configuración

Después de configurar los secretos:

1. Haz un pequeño cambio en tu código
2. Haz commit y push:
   ```bash
   git add .
   git commit -m "Test Docker registry"
   git push origin main
   ```
3. Ve a la pestaña **Actions** en GitHub
4. Si todo está bien, verás que las imágenes se construyen y suben
5. Puedes ver las imágenes en:
   - GitHub: Tu repositorio → **Packages** (lado derecho)
   - Docker Hub: https://hub.docker.com/u/tu-usuario

