# Configurar .env en la VPS

## Problema

El `docker-compose.yml` necesita un archivo `.env` en la **raíz del proyecto** (donde está el docker-compose.yml) con las variables:
- `MONGODB_URI`
- `JWT_SECRET`

## Solución: Crear archivo .env en la raíz

### En tu VPS, ejecuta:

```bash
# 1. Ir a la raíz del proyecto
cd ~/apps/sistema-alojamiento

# 2. Crear archivo .env
nano .env
```

### 3. Agregar este contenido al archivo .env:

```env
MONGODB_URI=mongodb+srv://gilbertoruffner1_db_user:dOEfE4M8yJy0sAOn@clusterprueba.stexqut.mongodb.net/airbnb?retryWrites=true&w=majority
JWT_SECRET=a3f715c40d778ec051bb1c56da19dbf9c2d3e30f523dd67ea50a7f87b0093fca7ab0a14b7b325098614638122e8b9a54902ee3ceee399ea91ab9d031662d4d3b
```

**Importante:**
- Reemplaza `MONGODB_URI` con tu cadena de conexión real de MongoDB Atlas
- Agrega el nombre de la base de datos antes del `?`: `/airbnb?` (o el nombre que quieras)
- El `JWT_SECRET` puede ser el mismo que usaste localmente o generar uno nuevo

### 4. Guardar el archivo:
- `Ctrl+X`
- `Y` (para confirmar)
- `Enter`

### 5. Verificar que el archivo existe:

```bash
cat .env
```

Deberías ver las dos variables.

### 6. Reiniciar los contenedores:

```bash
# Detener contenedores
docker-compose down

# Levantar de nuevo (ahora leerá el .env)
docker-compose up -d

# Ver logs del backend para verificar conexión
docker-compose logs backend
```

## Verificar que funciona

### 1. Ver logs del backend:

```bash
docker-compose logs -f backend
```

Deberías ver:
```
Conectado a MongoDB Atlas
Backend escuchando en puerto 3000
```

### 2. Probar el endpoint de health:

```bash
curl http://localhost:3003/health
```

Debería responder: `{"status":"ok"}`

### 3. Probar login:

- Ve a: `http://TU_IP:4300`
- Email: `admin`
- Password: `admin123`

## Estructura de archivos en VPS

```
~/apps/sistema-alojamiento/
├── .env                    ← AQUÍ (en la raíz, junto a docker-compose.yml)
├── docker-compose.yml
├── backend/
│   └── .env               ← Este NO se usa (solo para desarrollo local)
├── frontend-user/
└── frontend-admin/
```

## Si sigue sin funcionar

### Verificar variables de entorno en el contenedor:

```bash
# Ver variables de entorno del contenedor backend
docker-compose exec backend env | grep -E "MONGODB_URI|JWT_SECRET"
```

### Ver logs detallados:

```bash
# Ver todos los logs
docker-compose logs

# Ver solo errores
docker-compose logs | grep -i error
```

### Verificar conexión a MongoDB:

```bash
# Ver logs del backend en tiempo real
docker-compose logs -f backend
```

Si ves errores de conexión, verifica:
1. Que la IP de tu VPS esté en la whitelist de MongoDB Atlas
2. Que la cadena de conexión sea correcta
3. Que el nombre de usuario y contraseña sean correctos

