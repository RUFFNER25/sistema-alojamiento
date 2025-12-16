# Configuración de MongoDB Atlas

## Pasos para crear el cluster

### 1. Crear cuenta en MongoDB Atlas
- Ve a https://www.mongodb.com/cloud/atlas/register
- Regístrate o inicia sesión

### 2. Crear un proyecto
- En el dashboard, crea un proyecto (ej: "Airbnb Clone")

### 3. Crear el cluster
- Haz clic en "Build a Database"
- Selecciona el tipo:
  - **FREE (M0)**: 512 MB, compartido (suficiente para desarrollo)
  - **PAID**: M10+ para producción
- Selecciona proveedor y región (ej: AWS, región cercana)
- Nombra el cluster (ej: "Cluster0")
- Haz clic en "Create"

### 4. Configurar acceso

#### Usuario de base de datos:
- Ve a **Security → Database Access**
- Haz clic en **"Add New Database User"**
- Crea un usuario y contraseña (guárdalos)
- Privilegios: "Atlas admin" o "Read and write to any database"
- Haz clic en "Add User"

#### Red (IP Whitelist):
- Ve a **Network Access**
- Haz clic en **"Add IP Address"**
- Para desarrollo local: **"Add Current IP Address"**
- Para producción: agrega las IPs de tus servidores
- ⚠️ **NO uses "Allow Access from Anywhere" (0.0.0.0/0) en producción**

### 5. Obtener la cadena de conexión
- En **Deployments**, haz clic en **"Connect"** en tu cluster
- Selecciona **"Connect your application"**
- Driver: **Node.js**, Version: **5.5 or later**
- Copia la cadena de conexión

### 6. Configurar en el proyecto

Crea un archivo `.env` en la carpeta `backend/` con:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/airbnb?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura_aqui
PORT=3000
```

**Importante:**
- Reemplaza `<username>` y `<password>` con tus credenciales
- El nombre de la base de datos (`airbnb`) va después del host y antes de `?`
- **NUNCA** subas el archivo `.env` a Git (ya está en .gitignore)

### 7. Verificar conexión

Ejecuta el backend:
```bash
cd backend
npm run dev
```

Deberías ver: `Conectado a MongoDB Atlas`

## Troubleshooting

- **Error de conexión**: Verifica que tu IP esté en la whitelist
- **Error de autenticación**: Verifica usuario y contraseña en la URI
- **Timeout**: Verifica la región del cluster (debe estar cerca de tu ubicación)

