# Instalar Docker en VPS Contabo (Problema de Memoria)

## Problema: "Killed" al instalar Docker

Esto significa que tu VPS se quedó sin memoria. Vamos a solucionarlo.

## Solución 1: Verificar Memoria y Agregar Swap

### Paso 1: Ver cuánta memoria tienes

```bash
free -h
```

### Paso 2: Verificar si tienes swap

```bash
swapon --show
```

### Paso 3: Crear Swap (si no tienes o es muy pequeño)

```bash
# Crear archivo de swap de 2GB (ajusta según necesites)
sudo fallocate -l 2G /swapfile

# Dar permisos correctos
sudo chmod 600 /swapfile

# Formatear como swap
sudo mkswap /swapfile

# Activar swap
sudo swapon /swapfile

# Hacer permanente (agregar al fstab)
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Verificar
free -h
swapon --show
```

### Paso 4: Instalar Docker (método alternativo más ligero)

```bash
# Actualizar sistema
sudo apt-get update

# Instalar dependencias
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Agregar clave GPG de Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Agregar repositorio
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verificar instalación
docker --version
docker compose version
```

## Solución 2: Instalar Docker Compose por separado (más ligero)

Si el método anterior sigue fallando:

```bash
# Instalar Docker desde repositorio de Ubuntu (más ligero)
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# Iniciar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Agregar tu usuario al grupo docker (para no usar sudo)
sudo usermod -aG docker $USER

# Cerrar sesión y volver a entrar, o ejecutar:
newgrp docker

# Verificar
docker --version
docker-compose --version
```

## Solución 3: Instalar en partes (si sigue fallando)

```bash
# 1. Solo actualizar primero
sudo apt-get update

# 2. Instalar dependencias básicas
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# 3. Agregar clave GPG
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 4. Agregar repositorio
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 5. Actualizar de nuevo
sudo apt-get update

# 6. Instalar Docker (sin plugins extras)
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# 7. Instalar Docker Compose por separado
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar
docker --version
docker-compose --version
```

## Verificar que Funciona

```bash
# Probar Docker
sudo docker run hello-world

# Si funciona, agregar tu usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Probar sin sudo
docker run hello-world
```

## Si Nada Funciona: Usar VPS con Más Memoria

Si tu VPS de Contabo es muy pequeña (menos de 1GB RAM), considera:
1. Actualizar a un plan con más memoria
2. O usar un servicio como Railway, Render, o Fly.io que manejan Docker automáticamente

## Comandos Útiles

```bash
# Ver memoria disponible
free -h

# Ver procesos usando más memoria
top

# Ver espacio en disco
df -h

# Limpiar caché de apt
sudo apt-get clean
sudo apt-get autoremove
```

