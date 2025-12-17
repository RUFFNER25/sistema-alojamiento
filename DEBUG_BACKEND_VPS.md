# Debug Backend en VPS - No se conecta a MongoDB

## Problema

El backend está corriendo pero no muestra "Conectado a MongoDB Atlas", lo que significa que no está leyendo las variables de entorno correctamente.

## Solución: Verificar Variables de Entorno

### Paso 1: Verificar que las variables están en el contenedor

```bash
# Ver todas las variables de entorno del contenedor
docker-compose exec backend env | grep -E "MONGODB_URI|JWT_SECRET|PORT"
```

Si no aparecen o están vacías, el problema es que docker-compose no está leyendo el .env

### Paso 2: Verificar que el .env existe y está en el lugar correcto

```bash
# Verificar que el .env está en la raíz
cd ~/apps/sistema-alojamiento
ls -la .env

# Ver el contenido (sin mostrar la contraseña completa)
cat .env | sed 's/\(.*password[^@]*@\)[^@]*/\1***/'
```

### Paso 3: Verificar formato del .env

El archivo .env debe estar en la **misma carpeta** que el `docker-compose.yml`:

```
~/apps/sistema-alojamiento/
├── .env              ← AQUÍ (mismo nivel que docker-compose.yml)
├── docker-compose.yml
├── backend/
└── frontend-user/
```

### Paso 4: Verificar que el .env tiene el formato correcto

El archivo debe tener exactamente:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.xxx.mongodb.net/airbnb?retryWrites=true&w=majority
JWT_SECRET=tu-clave-secreta-aqui
```

**Importante:**
- Sin espacios alrededor del `=`
- Sin comillas (a menos que la URI tenga espacios)
- El nombre de la base de datos debe estar antes del `?`: `/airbnb?`

### Paso 5: Reiniciar contenedores después de cambiar .env

```bash
# Detener
docker-compose down

# Levantar de nuevo (lee el .env)
docker-compose up -d

# Ver logs
docker-compose logs -f backend
```

## Si las variables no aparecen

### Opción A: Pasar variables directamente en docker-compose.yml

Edita el `docker-compose.yml` y cambia:

```yaml
environment:
  - MONGODB_URI=mongodb+srv://usuario:password@cluster.xxx.mongodb.net/airbnb?retryWrites=true&w=majority
  - JWT_SECRET=tu-clave-secreta
  - PORT=3000
```

### Opción B: Usar archivo .env específico

```bash
# Crear .env con otro nombre
nano .env.production

# Luego usar:
docker-compose --env-file .env.production up -d
```

## Verificar conexión a MongoDB

### Ver logs completos del backend:

```bash
docker-compose logs backend
```

Busca errores como:
- "Error conectando a MongoDB Atlas"
- "Falta la variable de entorno MONGODB_URI"
- "MongooseServerSelectionError"

### Probar conexión manualmente:

```bash
# Entrar al contenedor
docker-compose exec backend sh

# Ver variables de entorno
env | grep MONGODB

# Salir
exit
```

## Solución Rápida: Editar docker-compose.yml directamente

Si el .env no funciona, puedes editar el docker-compose.yml:

```yaml
environment:
  - MONGODB_URI=mongodb+srv://gilbertoruffner1_db_user:dOEfE4M8yJy0sAOn@clusterprueba.stexqut.mongodb.net/airbnb?retryWrites=true&w=majority
  - JWT_SECRET=a3f715c40d778ec051bb1c56da19dbf9c2d3e30f523dd67ea50a7f87b0093fca7ab0a14b7b325098614638122e8b9a54902ee3ceee399ea91ab9d031662d4d3b
  - PORT=3000
```

Luego:
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f backend
```

