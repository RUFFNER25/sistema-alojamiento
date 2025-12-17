# Cómo Obtener Access Token de Docker Hub - Guía Visual

## Método 1: Enlace Directo (Más Fácil)

1. **Abre este enlace directamente:**
   ```
   https://hub.docker.com/settings/security
   ```

2. Si no estás logueado, inicia sesión con tu cuenta de GitHub

3. **Scroll hacia abajo** hasta encontrar la sección **"Access Tokens"**

4. Verás un botón **"New Access Token"** o **"Create Access Token"**

5. Click en ese botón

6. Completa el formulario:
   - **Description/Name:** `GitHub Actions`
   - **Permissions:** Selecciona **"Read, Write & Delete"** (o al menos "Read & Write")
   - Click en **"Generate"** o **"Create"**

7. **⚠️ IMPORTANTE:** Copia el token inmediatamente (empieza con `dckr_pat_...`)
   - Se muestra solo una vez
   - Si lo pierdes, tendrás que crear uno nuevo

8. Ese token es lo que pones en el secreto `DOCKER_PASSWORD` en GitHub

---

## Método 2: Navegación Manual

1. Ve a https://hub.docker.com

2. **Inicia sesión** (arriba a la derecha)

3. Click en tu **foto de perfil** (arriba a la derecha)

4. En el menú desplegable, click en **"Account Settings"**

5. En el menú izquierdo, click en **"Security"**

6. Scroll hacia abajo hasta **"Access Tokens"**

7. Click en **"New Access Token"**

8. Sigue los pasos del Método 1 (pasos 6-8)

---

## ¿No Ves la Sección "Access Tokens"?

Si no encuentras la sección, puede ser porque:

1. **Estás en la página incorrecta:**
   - Asegúrate de estar en: `hub.docker.com/settings/security`
   - No en `hub.docker.com/settings/general` u otra página

2. **Tu cuenta es muy nueva:**
   - Algunas cuentas nuevas pueden tener la opción en otra ubicación
   - Intenta buscar "API" o "Tokens" en el menú

3. **Estás usando Docker Desktop:**
   - El token se crea en la web de Docker Hub, no en Docker Desktop

---

## Formato del Token

El token que obtengas se verá así:
```
dckr_pat_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

- Empieza con `dckr_pat_`
- Es una cadena larga de letras y números
- **NO es tu contraseña de Docker Hub**

---

## Después de Obtener el Token

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click en **"New repository secret"**
4. **Name:** `DOCKER_PASSWORD`
5. **Secret:** Pega el token que copiaste
6. Click en **"Add secret"**

---

## ¿Todavía No Puedes Encontrarlo?

Si después de seguir estos pasos no encuentras la opción, puedes:

1. **Usar tu contraseña de Docker Hub** (menos seguro pero funciona):
   - En el secreto `DOCKER_PASSWORD`, pon tu contraseña de Docker Hub
   - ⚠️ Es menos seguro que usar un token

2. **Contactar soporte de Docker Hub:**
   - Puede que tu cuenta tenga alguna restricción

3. **Usar GitHub Container Registry en su lugar:**
   - Es más fácil de configurar si ya usas GitHub
   - Solo necesitas crear un Personal Access Token en GitHub

