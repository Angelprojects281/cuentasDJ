# Este README esta disponible en español e ingles, diciendo esto el proyecto esta comentado en estañol, se recomienda usar la extencion de VS "Comment Translate" para traducir los comentarios.

# This README is available in Spanish and English; however, since the project is commented in Spanish, we recommend using the VS extension "Comment Translate" to translate the comments.

##### En español.

# Proyecto CuentasDJ

## Contexto del proyecto:

- este proyecto es un proyecto de practica que utiliza tecnologias como React, NODEjs, y MySQL, pretende simular un sistemas de gestion de cuentas y usuarios para una empresa de alimentos. con el fin de no solo gestionar las cuentas sino tambien tener un sistema robusto en temas de seguridad y manejo de datos sensibles.

## Estado actual del proyecto:

- En este preciso instante el proyecto ya incluye modulos de gestion de ususarios, tales como:

1. -creacion de nuevos usuarios
2. -eliminacion de usuarios
3. -validaciones de seguridad
4. -manejo especifico de errores tanto errores comunes de ususario como errores complejos bajo los servidores
5. -manejo de base de datos real con MySQL
6. -interaccion real de usuarios con protecciones de rutas y proteccion de acceso

## Principales dependencias y librerias que debes instalar para su funcionamiento:

1. frontend:
   - @testing-library/dom: Herramientas para realizar pruebas sobre el DOM de forma confiable.
   - @testing-library/jest-dom: Extiende Jest con aserciones específicas para validar elementos del DOM.
   - @testing-library/react: Facilita la prueba de componentes de React simulando su comportamiento real.
   - @testing-library/user-event: Permite simular interacciones del usuario en pruebas automatizadas.
   - jwt-decode: Utilidad para decodificar tokens JWT en el cliente.
   - react: Biblioteca principal para la construcción de interfaces de usuario.
   - react-dom: Maneja la renderización de componentes React en el navegador.
   - react-idle-timer: Detecta la inactividad del usuario dentro de la aplicación.
   - react-router-dom: Gestiona la navegación y el enrutamiento en aplicaciones React.
   - react-scripts: Proporciona la configuración base y scripts de desarrollo para la aplicación.
   - web-vitals: Permite medir métricas clave de rendimiento web.
   - zxcvbn: Evalúa la fortaleza de contraseñas ingresadas por el usuario.
   - sweetalert: crea alertas personalizadas de manera sencilla.

2. backend:
   - bcrypt: Biblioteca para el cifrado seguro de contraseñas mediante hashing.
   - cors: Middleware que habilita y configura el acceso entre dominios (Cross-Origin Resource Sharing).
   - dotenv: Permite gestionar variables de entorno desde archivos .env.
   - express: Framework web para Node.js utilizado para construir APIs y manejar rutas del servidor.
   - jsonwebtoken: Implementa la generación y validación de tokens JWT para autenticación y autorización.
   - mysql2: Cliente de MySQL para Node.js con soporte para consultas eficientes y promesas.
   - nodemailer: Herramienta para el envío de correos electrónicos desde el servidor.

# Como configurarlo para su uso y prueba:

### 1. instalacion de dependencias:

Asegurate de instalar cada una de las dependencias mencionadas anteriormente, en este proyecto se usaron las ultimas versiones de cada una de estas.

### 2. creacion de archivos .env para tokens y correos:

Este proyecto utiliza un sistema de gestion de ususarios centralizado en administradores, es decir, que todos los correos para los codigos se envian a un unico correo de administrador.

2.1: A continuacion despues de tener las carpetas ya en tu repositorio local debes crear los siguientes archivos especificamente:

### En la ruta /backend/ (carpeta raiz del backend):

- Archivo llamado "contrasena.env" que debe tener el siguiente contenido:

```bash
correo= (aqui se coloca el correo gmail al que llegaran los correos)
contrasena= (aqui pondras la contraseña de aplicacion que te dara google automaticamente, NO PONER TU CONTRASEÑA REAL||     enlace tuto para generar la contraseña: https://youtube.com/shorts/QzR0SnqcHbo?si=S1EEUTVjZ3g1PMv-  || creditos:     TechForest)
```

- Archivo llamado "secretKey.env" que debe tener el siguiente contenido:
  ```bash
  JWT-SECRET= (aqui va una contraseña de tu preferencia, prioriza que sea segura)
  ```

### 3. configuracion de la base de datos:

3.1: para configurar la base de datos debes realizar la creacion de la tabla ya sea en la consola de comandos de tu servidor o ejecutando el comando directamente en MySQL Workbench.

3.2: comando para la creacion de la base de datos:

- En el siguiente comando se crea la base de datos, se crea la tabla con los campos requeridos y se crea un usuario por defecto para inicio de sesion:

- Crear base de datos:

Ejecuta el script SQL incluido:

```bash
mysql -u root -p < esquemasSQL/tablaUsuarios.sql
```

Para realizar el inicio de sesion se crea un usuario por defecto con credenciales:

```
Usuario: Admin
contraseña: Admin
```

la contraseña se genera con un hash de bcrypt externo, y ya que el backend tenga acceso a la base de datos usara la dependencia bcrypt para comparar la contraseña en texto plano en el modulo de inicio de sesion con la contraseña guardada en la base de datos.

- el siguiente comando es para la creacion de la base de datos de las cuentas, la cual tiene dos tablas:

Ejecuta el script SQL incluido:

```bash
mysql -u root -p < esquemasSQL/tablaUsuarios.sql
```

3.3: conexion a la base de datos:

para conectar tu base de datos debes dirigirte a la ruta "/backend/config/db.js" o "backend/config/dbProduccion.js
aqui encontraras y modificaras el siguiente contenido:

```bash

    const mysql = require("mysql2");

const db = mysql.createConnection({
host: "localhost", -> el host de tu servidor de base de datos
user: "root", -> el nombre de usuario que tengas configurado en tu servidor
password: "sqlCuentasdj", -> la contraseña de tu servidor
database: "cuentasdjUsers", -> la base de datos que creamos previamente
});

db.connect((err) => { -> no modificar, esto comprueba que el backend si se esta comunicando con la base de datos
if (err) {
console.error("Error al conectar a la base de datos:", err);
return;
}
console.log("Conexión a la base de datos establecida");
);

module.exports = db;

```

# Cosas a tener en cuenta

#### 1. El nombre de las variables estan en su mayoria en español.

#### 2. Se puede interpetar como inconsistencia las variables contraseña y contrasena, pero esto es debido a la configuracion tanto de node como de las variables de base de datos, se deben dejar tan cual estan para el correcto funcionamiento.

#### 3. El backend y el frontend estan separados de forma individual, es por ello que es importante leer la siguiente seccion para entender como configurar ambos servidores.

# configuracion y conexion de los servidores

### servidor de frontend:

Este servidor se encarga de renderizar toda la parte del frontend, hacer los llamados al servidor del backend y hacer validaciones previas y posteriores de acuerdo a la interaccion del usuario.

## configuracion del servidor frontend

Este servidor utiliza la configuracion predeterminada de `create-react-app` el cual se lanza por defecto en el puerto 3000 con la URL `
  Local:            http://localhost:3000`.

Para inicializar el servidor vamos a PowerShell o cualquier consola de comandos, y nos ubicamos en la ruta ` ../cuentasdjreact/frontend` y ya ubicados ejecutamos el comando `npm start`.
Si todo salio bien aparecera en consola un mensaje de confirmacion que dice `webpack compiled successfully`.

## configuracion del servidor backend

En este servidor debemos agregar una configuracion diferente, ya que debemos levantarlo en otro puerto diferente al frontend.

si nos ditigimos a la ruta `../backend/app.js` podemos ver en la linea 28 que seleccionamos el puerto 4000.
Este puerto lo podemos modificar a nuestro gusto teniendo en cuenta que tenemos que modificar los componentes del frontend para que llamen al nuevo puerto que asignamos.

## lanzamiento del backend

Para lanzar este servidor debemos abrir la consola como anteriormente y dirigirnos a la ruta `../cuentasdjreact/backend` y ahi ejecutar el comando `node app`.
si todo salio bien la consola nos mostrara el mensaje de confirmacion `Servidor corriendo en http://localhost:4000
Conexión a la base de datos establecida`

## configuracion del servidor MySQL

Aqui hemos utilizado MySQL workbench, el cual nos permite crear un servidor local para nuestras bases de datos, para crear este servidor local podemos recurrir a un tutorial sencillo.
En este caso el mas simplificado se encuentra en https://youtu.be/aA_qp6pqbPI?si=MTMvh0Hb7gRI16T8 || creditos: VerTutoriales

Aqui nos enseña como crear la conexion del servidor y previamente habiamos hecho la configuracion de esta base de datos.
[configuracion](#3-configuracion-de-la-base-de-datos)

## Recomendaciondes antes de lanzar los servidores

- verifica que el backend y el frontend esten usando los puertos correctos
- verifica que ningun otro servidor este corriendo en ese puerto de forma simultanea
- verifica que si realizas algun cambio pequeño ya sea en las rutas o en los puertos tambien hagas el cambio en todos los componentes en los que se utiliza.

### Realimentacion final

Este proyecto representa una implementación práctica de un sistema de gestión de usuarios con un enfoque claro en la seguridad, la validación de datos y la separación de responsabilidades entre frontend y backend.

A lo largo de su desarrollo se aplicaron conceptos importantes como:

- Autenticación basada en tokens (JWT)
- Encriptación de contraseñas mediante bcrypt
- Manejo de roles de usuario (administrador / regular)
- Validaciones tanto del lado del cliente como del servidor
- Manejo estructurado de errores
- Uso de variables de entorno para proteger información sensible
- Integración completa entre frontend, backend y base de datos

#### tenemos en cuenta que este proyecto actualmente esta enfocado a un entorno de pruebas y busca ser adaptado y mejorado a un entorno de produccion real, asi que faltan muchos cambios y confguraciones que se estaran realizando a mdedida del tiempo, ademas que este proyecto solo tiene un colaborador lo cual incrementa el tiempo de desarrollo, la implemetacion de funcionalidades y la correxion de posibles errores.

### Y SI ESTAS LEYENDO ESTO ME AYUDARIAS MUCHO CON TU ESTRELLA⭐

# 🗽In English

# CuentasDJ Project

## README Language Note

This README is available in Spanish and English. However, since the project is commented in Spanish, it is recommended to use the VS Code extension **"Comment Translate"** to translate code comments if needed.

---

# Project Overview

## CuentasDJ Project

## Project Context

This is a practice project using **React, Node.js, and MySQL**. It simulates an account and user management system for a food company.

The goal is not only to manage accounts but also to implement a robust system focused on **security and sensitive data handling**.

---

## Current Project Status

At this moment, the project includes user management modules such as:

1. Creation of new users
2. Deletion of users
3. Security validations
4. Structured error handling (both user-level and server-side errors)
5. Real database integration using MySQL
6. Secure user interaction with route protection and access control

---

## Main Dependencies and Libraries

### Frontend

- @testing-library/dom: Tools for DOM testing
- @testing-library/jest-dom: Custom Jest DOM matchers
- @testing-library/react: Testing React components
- @testing-library/user-event: Simulates user interactions
- jwt-decode: Decodes JWT tokens in the client
- react: UI library
- react-dom: DOM rendering for React
- react-idle-timer: Detects user inactivity
- react-router-dom: Routing system
- react-scripts: CRA configuration
- web-vitals: Performance metrics
- zxcvbn: Password strength estimator
- sweetalert: Custom alert system

---

### Backend

- bcrypt: Password hashing
- cors: Cross-Origin Resource Sharing middleware
- dotenv: Environment variable management
- express: Node.js server framework
- jsonwebtoken: JWT authentication
- mysql2: MySQL driver
- nodemailer: Email sending service

---

# Setup Instructions

## 1. Install Dependencies

Install all dependencies listed above using npm. Latest stable versions were used.

---

## 2. Environment Variables

This system uses a centralized admin-based user management flow.

### Backend required files:

#### `/backend/contrasena.env`

```bash
correo= (your Gmail address for receiving emails)
contrasena= (Google App Password, NOT your real password)
```

> Important: Do NOT use your real Gmail password.

---

#### `/backend/secretKey.env`

```bash
JWT-SECRET= (your secure secret key)
```

---

# 3. Database Setup

## Create database and tables

Run the following command:

```bash
mysql -u root -p < esquemasSQL/tablaUsuarios.sql
```

---

## Default login user

A default user is created for testing purposes:

```text
Usuario: Admin
contraseña: Admin
```

Passwords are hashed using bcrypt. The backend compares the plaintext password with the stored hash during login.

---

# Database Connection

Go to:

```
/backend/config/db.js
```

or

```
/backend/config/dbProduccion.js
```

Modify the following configuration:

```js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // database host
  user: "root", // database user
  password: "sqlCuentasdj", // database password
  database: "cuentasdjUsers", // database name
});

// DO NOT MODIFY: verifies backend DB connection

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Database connection established");
});

module.exports = db;
```

---

# Important Notes

1. Most variable names are in Spanish by design.
2. There is intentional usage of both `contraseña` and `contrasena` due to system constraints.
3. Frontend and backend are separated and must be configured independently.

---

# Server Setup

## Frontend Server

Runs using Create React App on:

```
http://localhost:3000
```

### Start frontend:

```bash
cd ../cuentasdjreact/frontend
npm start
```

If successful, you will see:

```
webpack compiled successfully
```

---

## Backend Server

Backend runs on port 4000 by default.

File:

```
/backend/app.js
```

### Start backend:

```bash
cd ../cuentasdjreact/backend
node app
```

Expected output:

```
Server running at http://localhost:4000
Database connection established
```

---

## MySQL Setup

This project uses MySQL Workbench for local database management.

Tutorial reference:
https://youtu.be/aA_qp6pqbPI

---

# Recommendations Before Running

- Ensure frontend and backend ports are correctly configured
- Ensure no other services are using the same ports
- If you modify routes or ports, update them across all components

---

# Final Thoughts

This project demonstrates a user management system focused on:

- Security
- Data validation
- Separation of frontend and backend

Implemented concepts include:

- JWT authentication
- bcrypt password encryption
- Role-based access control (admin / regular)
- Client and server-side validation
- Structured error handling
- Environment variables for sensitive data
- Full integration between frontend, backend, and database

---

This project is currently intended for testing purposes and will be improved over time for production use. Development is ongoing and handled by a single contributor.

---

### ⭐ If you are reading this, a star would be appreciated!
