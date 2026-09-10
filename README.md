# CuentasDJ

Sistema web de gestión de usuarios, producción y auditoría para una empresa de alimentos. Este repositorio contiene el proyecto completo: **frontend en React**, **backend en Node.js/Express** y **esquema SQL en MySQL**.

This repository contains the complete CuentasDJ application: a **React frontend**, a **Node.js/Express backend**, and the **MySQL SQL schema** required by both layers.

---

## Índice / Table of Contents

- [Descripción / Overview](#descripción--overview)
- [Arquitectura / Architecture](#arquitectura--architecture)
- [Características / Features](#características--features)
- [Requisitos / Requirements](#requisitos--requirements)
- [Instalación / Installation](#instalación--installation)
- [Configuración / Configuration](#configuración--configuration)
- [Base de datos / Database](#base-de-datos--database)
- [Ejecución / Running the application](#ejecución--running-the-application)
- [Roles / User roles](#roles--user-roles)
- [API](#api)
- [Estructura / Structure](#estructura--structure)
- [Seguridad / Security](#seguridad--security)
- [Limitaciones / Limitations](#limitaciones--limitations)

---

# Español

## Descripción

CuentasDJ es una aplicación de práctica orientada a la gestión de cuentas de usuario y registros de producción. Incluye autenticación con JWT, protección de rutas por rol, gestión de usuarios, registro de producción con cálculos de rendimiento y auditoría de actividades del sistema.

El proyecto está separado en tres partes dentro del mismo repositorio:

- `frontend/`: aplicación React ejecutada con Vite.
- `backend/`: API REST construida con Node.js y Express.
- `esquemasSQl/`: script SQL para crear la base de datos, sus tablas y el usuario administrador inicial.

## Arquitectura

```text
Navegador (http://localhost:3000)
        |
        v
Frontend React + Vite
        |
        | VITE_API = http://localhost:4000/api
        v
Backend Node.js + Express
        |
        | mysql2
        v
Base de datos MySQL: cuentasdj
  |-- usuarios
  |-- produccion
  |-- bache
  `-- actividad_sistema
```

La aplicación usa **una única base de datos MySQL llamada `cuentasdj`**. Las tablas de usuarios, producción y auditoría se encuentran en esa misma base; ya no se utilizan conexiones separadas para producción o auditoría. Todos los controladores usan la conexión compartida definida en `backend/config/db.js`.

## Características

- Inicio de sesión con tokens JWT.
- Roles de usuario: `admin`, `regular` y `auditor`.
- Creación, consulta y eliminación de usuarios.
- Cambio de contraseña mediante código enviado por correo.
- Protección de rutas en el frontend y verificación de tokens en el backend.
- Creación y consulta de registros de producción.
- Registro de baches relacionados con cada producción.
- Cálculos de rendimiento y cantidades producidas.
- Consulta de actividades de auditoría por tipo y rango de fechas.
- Detección de inactividad y validación de fortaleza de contraseñas.

## Requisitos

- Node.js y npm.
- MySQL Server, preferiblemente MySQL 8 o compatible.
- Un navegador moderno.
- Una cuenta de correo con contraseña de aplicación si se desea probar el cambio de contraseña por correo.

## Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd cuentasdjreact

cd backend
npm install

cd ../frontend
npm install
```

## Configuración

### Backend

Crea estos archivos locales dentro de `backend/`. No compartas estos archivos ni subas credenciales reales al repositorio.

`backend/secretKey.env`:

```env
JWT_SECRET=una-clave-larga-y-segura
```

`backend/contrasena.env`:

```env
correo=tu-correo@gmail.com
contrasena=tu-contraseña-de-aplicacion
```

La contraseña debe ser una **contraseña de aplicación** del proveedor de correo, no la contraseña normal de la cuenta.

La conexión MySQL está centralizada en `backend/config/db.js` y utiliza estos valores de desarrollo por defecto:

```js
host: "localhost";
user: "root";
password: "sqlCuentasdj";
database: "cuentasdj";
```

Modifica estos valores según tu instalación local. La aplicación utiliza una conexión única para todas las tablas.

### Frontend

Crea `frontend/.env` con:

```env
VITE_API=http://localhost:4000/api
```

Si cambias el puerto o la dirección del backend, actualiza esta variable. `frontend/vite.config.js` configura el servidor de desarrollo en el puerto `3000`.

## Base de datos

El esquema completo está en [`esquemasSQl/cuentasDj.sql`](esquemasSQl/cuentasDj.sql). Este único script:

1. Crea la base de datos `cuentasdj`.
2. Crea las tablas `usuarios`, `produccion`, `bache` y `actividad_sistema`.
3. Configura la relación entre `bache` y `produccion` mediante una clave foránea.
4. Inserta el usuario administrador inicial.

Ejecuta el script desde la raíz del proyecto:

```bash
mysql -u root -p < esquemasSQl/cuentasDj.sql
```

También puedes ejecutarlo desde MySQL Workbench. El script contiene una instrucción `DROP TABLE` para `usuarios`; revísalo antes de ejecutarlo en una base que ya tenga datos importantes.

## Ejecución

Abre dos terminales.

Terminal 1, backend:

```bash
cd backend
node app.js
```

API disponible en `http://localhost:4000`.

Terminal 2, frontend:

```bash
cd frontend
npm run dev
```

Interfaz disponible en `http://localhost:3000`.

Para generar y previsualizar una compilación de producción:

```bash
cd frontend
npm run build
npm run preview
```

## Roles

| Rol       | Responsabilidades                                                                   |
| --------- | ----------------------------------------------------------------------------------- |
| `admin`   | Gestionar usuarios, crear registros y consultar o eliminar registros de producción. |
| `regular` | Crear y consultar registros de producción.                                          |
| `auditor` | Consultar la actividad registrada en el sistema.                                    |

## API

Todas las rutas de negocio usan el prefijo `/api`.

| Método   | Ruta                                  | Descripción                                       |
| -------- | ------------------------------------- | ------------------------------------------------- |
| `POST`   | `/api/login`                          | Iniciar sesión.                                   |
| `POST`   | `/api/cambiarcontrasena`              | Solicitar un código de cambio de contraseña.      |
| `POST`   | `/api/verificarCodigo`                | Verificar el código de cambio.                    |
| `POST`   | `/api/crearUsuario`                   | Crear un usuario.                                 |
| `GET`    | `/api/listarUsuarios`                 | Listar usuarios.                                  |
| `DELETE` | `/api/usuario/:idUsuarios`            | Eliminar un usuario autenticado.                  |
| `POST`   | `/api/crearRegistro`                  | Crear un registro de producción.                  |
| `GET`    | `/api/consultarRegistro`              | Consultar producción por turno y fecha.           |
| `DELETE` | `/api/eliminarRegistro/:idProduccion` | Eliminar una producción y sus baches.             |
| `GET`    | `/api/consultarAuditoria`             | Consultar actividades por tipo y rango de fechas. |

La ruta raíz `GET /` sirve como comprobación básica y responde `Backend funcionando`.

## Estructura

```text
backend/
|-- app.js
|-- contrasena.env              # Configuración local de correo
|-- secretKey.env               # Secreto local para JWT
|-- config/db.js                # Única conexión MySQL
|-- controladores/              # Lógica de las rutas
|-- logicaMat/                  # Cálculos de producción
`-- routes/routes.js            # Rutas de la API

frontend/
|-- package.json
|-- vite.config.js
`-- src/
    |-- App.jsx
    |-- context/
    |-- generales/
    |-- inicio/
    |-- reutilizables/
    |-- userAdmin/
    |-- userAuditor/
    `-- userRegular/

esquemasSQl/
`-- cuentasDj.sql               # Esquema completo de MySQL
```

## Seguridad

- No publiques `backend/contrasena.env`, `backend/secretKey.env` ni `frontend/.env`.
- Usa una clave JWT larga, aleatoria y exclusiva para cada entorno.
- Usa contraseñas de aplicación para el correo.
- Cambia las credenciales por defecto de MySQL antes de desplegar.
- No uses el usuario administrador inicial en producción sin cambiar sus credenciales.
- Configura CORS para permitir únicamente los dominios autorizados.
- El proyecto está orientado actualmente a desarrollo y pruebas; requiere una revisión adicional antes de desplegarse en producción.

## Limitaciones conocidas

- El backend utiliza una configuración local de conexión y no un pool de conexiones.
- El puerto, el origen de CORS y algunas configuraciones de desarrollo están definidos en archivos del proyecto.
- No hay un script de pruebas automatizadas del backend configurado en `backend/package.json`.

Las variables y algunos nombres de columnas conservan convenciones en español porque forman parte del contrato actual entre el frontend, el backend y la base de datos.

---

# English

## Overview

CuentasDJ is a practice web application for user management, production records, and system auditing in a food-company context. It includes JWT authentication, role-based route protection, user administration, production calculations, and audit activity tracking.

This repository contains the complete application in three parts:

- `frontend/`: React application powered by Vite.
- `backend/`: REST API built with Node.js and Express.
- `esquemasSQl/`: MySQL script containing the database schema and the initial administrator user.

## Architecture

The browser loads the frontend from `http://localhost:3000`. The frontend sends requests to the backend through `VITE_API`, which defaults to `http://localhost:4000/api`. The backend uses `mysql2` to connect all features to the single MySQL database named `cuentasdj`.

The database contains `usuarios`, `produccion`, `bache`, and `actividad_sistema`. Production and audit operations no longer use separate database connections; all controllers use the shared connection defined in `backend/config/db.js`.

## Features

- JWT-based login.
- `admin`, `regular`, and `auditor` roles.
- User creation, listing, and deletion.
- Password-change flow using an email verification code.
- Frontend route protection and backend token verification.
- Production record creation and lookup.
- Batch records linked to production records.
- Production and yield calculations.
- Audit lookup by activity type and date range.
- Idle-user detection and password-strength validation.

## Requirements

- Node.js and npm.
- MySQL Server, preferably MySQL 8 or a compatible version.
- A modern web browser.
- An email account with an application password if the password-change flow must be tested.

## Installation

```bash
git clone <REPOSITORY_URL>
cd cuentasdjreact

cd backend
npm install

cd ../frontend
npm install
```

## Configuration

Create `backend/secretKey.env`:

```env
JWT_SECRET=use-a-long-random-secret
```

Create `backend/contrasena.env`:

```env
correo=your-email@gmail.com
contrasena=your-email-app-password
```

Use an email **application password**, not the normal account password. Do not commit these files or any real credentials.

The single MySQL connection is defined in `backend/config/db.js`. Its current development defaults are:

```js
host: "localhost";
user: "root";
password: "sqlCuentasdj";
database: "cuentasdj";
```

Update them for your local MySQL installation.

Create `frontend/.env`:

```env
VITE_API=http://localhost:4000/api
```

Update this value whenever the backend address or port changes. Vite serves the frontend on port `3000` by default.

## Database

The complete schema is available at [`esquemasSQl/cuentasDj.sql`](esquemasSQl/cuentasDj.sql). It creates the `cuentasdj` database, creates the four application tables, defines the foreign-key relationship between `bache` and `produccion`, and inserts the initial administrator user.

Run it from the repository root:

```bash
mysql -u root -p < esquemasSQl/cuentasDj.sql
```

You can also run the script in MySQL Workbench. Review it before running it against an existing database because it contains a `DROP TABLE` statement for `usuarios`.

## Running the application

Start the backend in one terminal:

```bash
cd backend
node app.js
```

The API will be available at `http://localhost:4000`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The interface will be available at `http://localhost:3000`.

To create and preview a production build:

```bash
cd frontend
npm run build
npm run preview
```

## User roles

| Role      | Responsibilities                                                                |
| --------- | ------------------------------------------------------------------------------- |
| `admin`   | Manage users, create production records, and view or delete production records. |
| `regular` | Create and view production records.                                             |
| `auditor` | View recorded system activity.                                                  |

## API

All application routes use the `/api` prefix.

| Method   | Route                                 | Description                                 |
| -------- | ------------------------------------- | ------------------------------------------- |
| `POST`   | `/api/login`                          | Sign in.                                    |
| `POST`   | `/api/cambiarcontrasena`              | Request a password-change code.             |
| `POST`   | `/api/verificarCodigo`                | Verify the password-change code.            |
| `POST`   | `/api/crearUsuario`                   | Create a user.                              |
| `GET`    | `/api/listarUsuarios`                 | List users.                                 |
| `DELETE` | `/api/usuario/:idUsuarios`            | Delete an authenticated user.               |
| `POST`   | `/api/crearRegistro`                  | Create a production record.                 |
| `GET`    | `/api/consultarRegistro`              | Find production by shift and date.          |
| `DELETE` | `/api/eliminarRegistro/:idProduccion` | Delete a production record and its batches. |
| `GET`    | `/api/consultarAuditoria`             | Find activity by type and date range.       |

The root `GET /` endpoint is a basic health check and responds with `Backend funcionando`.

## Structure

```text
backend/                       # Node.js and Express API
frontend/                      # React and Vite application
esquemasSQl/cuentasDj.sql     # Complete MySQL schema
```

The backend connection is centralized in `backend/config/db.js`; controller modules are located in `backend/controladores/`, API routes in `backend/routes/`, and production calculations in `backend/logicaMat/`.

## Security notes

- Never publish `backend/contrasena.env`, `backend/secretKey.env`, or `frontend/.env`.
- Use a long, random, environment-specific JWT secret.
- Use an email application password for SMTP access.
- Replace default MySQL credentials before deployment.
- Do not use the initial administrator credentials in production without changing them.
- Restrict CORS to trusted frontend origins.
- Review the application before deploying it to production; the current configuration is intended for development and testing.

## Current limitations

- The backend uses a local connection configuration instead of a connection pool.
- The port, CORS origin, and some development settings are defined in project files.
- No backend automated-test command is currently configured in `backend/package.json`.

Some variable names and database columns remain in Spanish because they are part of the current frontend, backend, and database contract.

---

Este README documenta conjuntamente el frontend, el backend y el esquema SQL. / This README documents the frontend, backend, and SQL schema together.
