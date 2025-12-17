# Solución: Variables de Entorno en VPS

## Problema 1: Variables no llegan al contenedor

El `.env` existe pero docker-compose no lo está leyendo. Solución:

### Opción A: Editar docker-compose.yml directamente (Más Rápido)

```bash
cd ~/apps/sistema-alojamiento
nano docker-compose.yml
```

Cambia la sección del backend a:

```yaml
  backend:
    build: ./backend
    container_name: airbnb-backend
    ports:
      - "3003:3000"
    environment:
      - MONGODB_URI=mongodb+srv://gilbertoruffner1_db_user:dOEfE4M8yJy0sAOn@clusterprueba.stexqut.mongodb.net/airbnb?retryWrites=true&w=majority
      - JWT_SECRET=a3f715c40d778ec051bb1c56da19dbf9c2d3e30f523dd67ea50a7f87b0093fca7ab0a14b7b325098614638122e8b9a54902ee3ceee399ea91ab9d031662d4d3b
      - PORT=3000
```

**Importante:** Agrega `/airbnb` antes del `?` en la MONGODB_URI

Guarda: `Ctrl+X`, `Y`, `Enter`

### Opción B: Verificar formato del .env

El `.env` debe tener exactamente este formato (sin espacios, sin comillas):

```env
MONGODB_URI=mongodb+srv://gilbertoruffner1_db_user:dOEfE4M8yJy0sAOn@clusterprueba.stexqut.mongodb.net/airbnb?retryWrites=true&w=majority
JWT_SECRET=a3f715c40d778ec051bb1c56da19dbf9c2d3e30f523dd67ea50a7f87b0093fca7ab0a14b7b325098614638122e8b9a54902ee3ceee399ea91ab9d031662d4d3b
```

Luego reinicia:
```bash
docker-compose down
docker-compose up -d
```

## Problema 2: IP de VPS no está en Whitelist de MongoDB Atlas

El error dice: "you're trying to access the database from an IP that isn't whitelisted"

### Solución: Agregar IP de tu VPS a MongoDB Atlas

1. **Obtener la IP de tu VPS:**
   ```bash
   curl ifconfig.me
   ```
   O
   ```bash
   hostname -I
   ```

2. **Agregar IP en MongoDB Atlas:**
   - Ve a https://cloud.mongodb.com
   - Selecciona tu proyecto
   - Ve a **Network Access** (o **IP Access List**)
   - Click en **"Add IP Address"**
   - Click en **"Add Current IP Address"** (si estás en la VPS)
   - O agrega manualmente la IP que obtuviste
   - O usa **"Allow Access from Anywhere"** (0.0.0.0/0) para desarrollo (menos seguro)

3. **Esperar unos minutos** para que se aplique el cambio

## Después de hacer los cambios

```bash
# Reiniciar contenedores
docker-compose down
docker-compose up -d

# Ver logs
docker-compose logs -f backend
```

Deberías ver:
```
Conectado a MongoDB Atlas
Backend escuchando en puerto 3000
```

