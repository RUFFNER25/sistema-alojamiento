# Configuración de Secretos en GitHub - Guía Paso a Paso

## Si tu cuenta de Docker está vinculada con GitHub

### Paso 1: Encontrar tu Usuario de Docker Hub

1. Ve a https://hub.docker.com
2. Inicia sesión (puedes usar "Sign in with GitHub")
3. Tu usuario aparece en:
   - Arriba a la derecha (tu foto de perfil)
   - O en la URL: `hub.docker.com/u/TU-USUARIO`
   
   **Ejemplo:** Si la URL es `hub.docker.com/u/ruffner`, tu usuario es `ruffner`

### Paso 2: Crear Access Token en Docker Hub

1. Ve a https://hub.docker.com/settings/security
2. Scroll hasta "Access Tokens"
3. Click en **"New Access Token"**
4. Nombre: `GitHub Actions`
5. Permisos: Selecciona **"Read, Write & Delete"** (o al menos Read & Write)
6. Click en **"Generate"**
7. ⚠️ **COPIA EL TOKEN INMEDIATAMENTE** (empieza con `dckr_pat_...`)
   - Si lo pierdes, tendrás que crear uno nuevo

### Paso 3: Agregar Secretos en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (arriba del repositorio)
3. En el menú izquierdo: **Secrets and variables** → **Actions**
4. Click en **"New repository secret"**

#### Secreto 1: DOCKER_REGISTRY
- **Name:** `DOCKER_REGISTRY`
- **Secret:** `docker.io`
- Click en **"Add secret"**

#### Secreto 2: DOCKER_USERNAME
- **Name:** `DOCKER_USERNAME`
- **Secret:** `tu-usuario-docker-hub` (el que encontraste en el Paso 1)
- Click en **"Add secret"**

#### Secreto 3: DOCKER_PASSWORD
- **Name:** `DOCKER_PASSWORD`
- **Secret:** `el-token-que-copiaste` (el del Paso 2, empieza con `dckr_pat_...`)
- Click en **"Add secret"**

### Paso 4: Verificar

Después de agregar los 3 secretos, deberías ver:

```
DOCKER_REGISTRY
DOCKER_USERNAME
DOCKER_PASSWORD
```

En la lista de secretos.

### Paso 5: Probar

1. Haz un pequeño cambio en tu código
2. Commit y push:
   ```bash
   git add .
   git commit -m "Test secrets"
   git push origin main
   ```
3. Ve a la pestaña **Actions** en GitHub
4. Verás el workflow ejecutándose
5. Si todo está bien, las imágenes se subirán a Docker Hub

---

## Ejemplo Real

Si tu usuario de Docker Hub es `ruffner`, los secretos serían:

```
DOCKER_REGISTRY = docker.io
DOCKER_USERNAME = ruffner
DOCKER_PASSWORD = dckr_pat_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

---

## ¿No Recuerdas tu Usuario?

1. Ve a https://hub.docker.com
2. Inicia sesión
3. Click en tu foto de perfil (arriba derecha)
4. Tu usuario aparece ahí
5. O ve a "Account Settings" y lo verás

---

## ¿Prefieres Usar tu Contraseña en lugar del Token?

Puedes usar tu contraseña de Docker Hub, pero:
- ⚠️ Es menos seguro
- ✅ El token es más seguro y recomendado

Si quieres usar contraseña:
- **DOCKER_PASSWORD** = tu contraseña de Docker Hub

