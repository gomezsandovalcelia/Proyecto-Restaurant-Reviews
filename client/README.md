# Restaurant Reviews

Restaurant Reviews es una aplicación web desarrollada con React, Express y MongoDB Atlas que permite a los usuarios registrar, gestionar y consultar reseñas de restaurantes.

## Tecnologías utilizadas

- React
- Express
- MongoDB Atlas
- Bootstrap
- JWT
- bcrypt
- Vercel

## Estructura del proyecto

- `client/`: frontend desarrollado con React
- `server/`: backend y API REST desarrollados con Express
- `database/`: copia exportada de la base de datos para pruebas en local

## Instalación

Es necesario instalar las dependencias tanto del frontend como del backend.

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

## Ejecución en local

### Iniciar backend

```bash
cd server
npm run dev
```

### Iniciar frontend

```bash
cd client
npm run dev
```

## Variables de entorno

Por seguridad, los archivos `.env` reales no se incluyen en la entrega.  
Se proporcionan archivos `.env.example` como referencia.

### Frontend

Debe existir un archivo `.env` en `client/` con una variable como esta:

```env
VITE_API_URL=http://localhost:4000
```

### Backend

Debe existir un archivo `.env` en `server/` con variables como estas:

```env
PORT=4000
MONGO_URL=tu_mongo_url
SECRET=tu_clave_secreta
```