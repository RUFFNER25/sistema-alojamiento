# Configuración para VPS de Contabo

## Secretos Necesarios en GitHub

Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions** y agrega:

### 1. VPS_HOST
- **Valor:** La IP o dominio de tu VPS de Contabo
- **Ejemplo:** `123.456.789.0` o `tu-dominio.com`

### 2. VPS_USER
- **Valor:** El usuario SSH de tu VPS
- **Ejemplo:** `root` o `ubuntu` o el usuario que uses

### 3. VPS_SSH_KEY
- **Valor:** Tu clave SSH privada (la que usas para conectarte a la VPS)
- **Cómo obtenerla:** Ver abajo

### 4. VPS_PORT (Opcional)
- **Valor:** Puerto SSH (por defecto es 22)
- **Ejemplo:** `22` o `2222` si cambiaste el puerto

### 5. VPS_PROJECT_PATH
- **Valor:** La ruta completa donde está tu proyecto en la VPS
- **Ejemplo:** `/root/sistema-alojamiento` o `/home/usuario/sistema-alojamiento`

---

## Paso 1: Preparar tu VPS de Contabo

### 1.1 Conectarte a tu VPS

```bash
ssh root@TU_IP_CONTABO
```

### 1.2 Instalar Docker y Docker Compose

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt-get update
apt-get install docker-compose-plugin -y

# Verificar instalación
docker --version
docker compose version
```

### 1.3 Clonar tu repositorio

```bash
# Ir a la carpeta donde quieres el proyecto
cd /root  # o /home/usuario

# Clonar el repositorio
git clone https://github.com/RUFFNER25/sistema-alojamiento.git
cd sistema-alojamiento

# Crear archivo .env para el backend
cd backend
nano .env
```

### 1.4 Configurar archivo .env del backend

En el archivo `.env` agrega:

```env
MONGODB_URI=tu-cadena-de-conexion-de-mongodb-atlas
JWT_SECRET=tu-clave-secreta-jwt
PORT=3000
```

Guarda y sal: `Ctrl+X`, luego `Y`, luego `Enter`

### 1.5 Probar que funciona localmente

```bash
# Volver a la raíz del proyecto
cd /root/sistema-alojamiento

# Ejecutar docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f
```

---

## Paso 2: Generar Clave SSH para GitHub Actions

### Opción A: Usar tu clave SSH existente

Si ya tienes una clave SSH que usas para conectarte a Contabo:

```bash
# En tu máquina local (Mac/Linux)
cat ~/.ssh/id_rsa
```

Copia TODO el contenido (desde `-----BEGIN OPENSSH PRIVATE KEY-----` hasta `-----END OPENSSH PRIVATE KEY-----`)

### Opción B: Crear nueva clave SSH

```bash
# En tu máquina local
ssh-keygen -t rsa -b 4096 -C "github-actions-contabo" -f ~/.ssh/github_actions_contabo

# Copiar la clave pública a tu VPS
ssh-copy-id -i ~/.ssh/github_actions_contabo.pub root@TU_IP_CONTABO

# Ver la clave privada (esta es la que pones en GitHub)
cat ~/.ssh/github_actions_contabo
```

---

## Paso 3: Configurar Secretos en GitHub

1. Ve a: `https://github.com/RUFFNER25/sistema-alojamiento/settings/secrets/actions`

2. Agrega estos secretos:

**VPS_HOST:**
- Name: `VPS_HOST`
- Secret: `TU_IP_CONTABO` (ejemplo: `123.456.789.0`)

**VPS_USER:**
- Name: `VPS_USER`
- Secret: `root` (o el usuario que uses)

**VPS_SSH_KEY:**
- Name: `VPS_SSH_KEY`
- Secret: `-----BEGIN OPENSSH PRIVATE KEY-----...` (toda la clave privada)

**VPS_PROJECT_PATH:**
- Name: `VPS_PROJECT_PATH`
- Secret: `/root/sistema-alojamiento` (la ruta donde clonaste el repo)

**VPS_PORT (Opcional):**
- Name: `VPS_PORT`
- Secret: `22` (o el puerto que uses)

---

## Paso 4: Probar el Despliegue

1. Haz un pequeño cambio en tu código
2. Commit y push:
   ```bash
   git add .
   git commit -m "Test deploy to Contabo"
   git push origin main
   ```
3. Ve a la pestaña **Actions** en GitHub
4. Verás el workflow ejecutándose
5. Si todo está bien, tu aplicación se desplegará automáticamente en Contabo

---

## Verificar que Funciona

Después del despliegue, puedes verificar:

```bash
# Conectarte a tu VPS
ssh root@TU_IP_CONTABO

# Ver contenedores corriendo
cd /root/sistema-alojamiento
docker-compose ps

# Ver logs
docker-compose logs -f
```

Tu aplicación debería estar disponible en:
- Backend: `http://TU_IP_CONTABO:3000`
- Frontend User: `http://TU_IP_CONTABO:4200`
- Frontend Admin: `http://TU_IP_CONTABO:4300`

---

## Troubleshooting

### Error: "Permission denied (publickey)"
- Verifica que la clave SSH pública esté en `~/.ssh/authorized_keys` de tu VPS
- Verifica que el secreto `VPS_SSH_KEY` tenga la clave privada completa

### Error: "git pull failed"
- Verifica que la ruta `VPS_PROJECT_PATH` sea correcta
- Verifica que el repositorio esté clonado en esa ruta

### Error: "docker-compose: command not found"
- Instala Docker Compose en la VPS
- O usa `docker compose` (sin guión) en lugar de `docker-compose`

