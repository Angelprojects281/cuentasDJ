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
7. -modulos para la creacion y consulta de gestion de produccion con logica matematica implementada
8. -gestion de auditorias para cambios en el sistema

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

   ### para instalar todas las dependencias dirigete en tu consola a la ruta "/cuentasdjreact/backend" o "/cuentasdjreact/frontend" y ejecuta el comando `npm install`, esto instalara automaticamente todas las dependencias necesarias.

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

- el siguiente comando es para la creacion de la base de datos de las auditorias, la cual tiene dos tablas:

Ejecuta el script SQL incluido:

```bash
mysql -u root -p < esquemasSQL/tablaAuditoria.sql
```

3.3: conexion a la base de datos:

para conectar tu base de datos debes dirigirte a la ruta "/backend/config/db.js" o "backend/config/dbProduccion.js" o "/backend/config/dbAuditoria.js"
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

# CuentasDJ Project

## Project Context

- This project is a practice project that uses technologies such as React, Node.js, and MySQL. It aims to simulate an account and user management system for a food company, with the purpose of not only managing accounts but also implementing a robust system focused on security and sensitive data handling.

## Current Project Status

- At this moment, the project already includes user management modules such as:

1. Creation of new users
2. User deletion
3. Security validations
4. Specific error handling for both common user errors and complex server-side errors
5. Real database management using MySQL
6. Real user interaction with route protection and access protection
7. Modules for production management creation and queries with implemented mathematical logic
8. Audit management for system changes

## Main Dependencies and Libraries Required

### 1. Frontend

- @testing-library/dom: Tools for reliably testing the DOM.
- @testing-library/jest-dom: Extends Jest with specific assertions to validate DOM elements.
- @testing-library/react: Simplifies React component testing by simulating real behavior.
- @testing-library/user-event: Allows simulation of user interactions in automated tests.
- jwt-decode: Utility for decoding JWT tokens on the client side.
- react: Main library for building user interfaces.
- react-dom: Handles rendering React components in the browser.
- react-idle-timer: Detects user inactivity within the application.
- react-router-dom: Manages navigation and routing in React applications.
- react-scripts: Provides the base configuration and development scripts for the application.
- web-vitals: Allows measuring key web performance metrics.
- zxcvbn: Evaluates the strength of passwords entered by the user.
- sweetalert: Creates custom alerts easily.

### 2. Backend

- bcrypt: Library for secure password hashing using encryption.
- cors: Middleware that enables and configures Cross-Origin Resource Sharing.
- dotenv: Allows management of environment variables through `.env` files.
- express: Web framework for Node.js used to build APIs and manage server routes.
- jsonwebtoken: Implements JWT token generation and validation for authentication and authorization.
- mysql2: MySQL client for Node.js with support for efficient queries and promises.
- nodemailer: Tool for sending emails from the server.

### To install all dependencies, navigate in your console to the path `/cuentasdjreact/backend` or `/cuentasdjreact/frontend` and execute the command:

```bash
npm install
```

This will automatically install all required dependencies.

# How to Configure It for Usage and Testing

## 1. Dependency Installation

Make sure to install each of the dependencies mentioned above. This project was developed using the latest versions of each one.

## 2. Creating `.env` Files for Tokens and Emails

This project uses a centralized administrator-based user management system, meaning all email codes are sent to a single administrator email account.

### 2.1 Required Files

After having the folders in your local repository, you must create the following files specifically:

### In the `/backend/` path (backend root folder):

- File named `contrasena.env` which must contain the following content:

```bash
correo= (place here the Gmail account that will receive the emails)
contrasena= (place here the application password automatically generated by Google, DO NOT USE YOUR REAL PASSWORD || tutorial link to generate the password: https://youtube.com/shorts/QzR0SnqcHbo?si=S1EEUTVjZ3g1PMv- || credits: TechForest)
```

- File named `secretKey.env` which must contain the following content:

```bash
JWT-SECRET= (place here a secure password of your preference)
```

# 3. Database Configuration

### 3.1 Database Setup

To configure the database, you must create the table either through your server command console or by directly executing the command in MySQL Workbench.

### 3.2 Database Creation Commands

- The following command creates the database, creates the table with the required fields, and creates a default user for login purposes.

### Create Database

Execute the included SQL script:

```bash
mysql -u root -p < esquemasSQL/tablaUsuarios.sql
```

A default user is created for login with the following credentials:

```txt
Usuario: Admin
contraseña: Admin
```

The password is generated using an external bcrypt hash, and once the backend has access to the database, it will use the bcrypt dependency to compare the plain text password entered in the login module with the password stored in the database.

- The following command is used to create the accounts database, which contains two tables:

Execute the included SQL script:

```bash
mysql -u root -p < esquemasSQL/tablaUsuarios.sql
```

- The following command is used to create the audit database, which contains two tables:

Execute the included SQL script:

```bash
mysql -u root -p < esquemasSQL/tablaAuditoria.sql
```

### 3.3 Database Connection

To connect your database, navigate to the path:

- `/backend/config/db.js`
- `/backend/config/dbProduccion.js`
- `/backend/config/dbAuditoria.js`

There you will find and modify the following content:

```bash
const mysql = require("mysql2");

const db = mysql.createConnection({
host: "localhost", -> your database server host
user: "root", -> the username configured on your server
password: "sqlCuentasdj", -> your server password
database: "cuentasdjUsers", -> the database we previously created
});

db.connect((err) => { -> do not modify, this checks whether the backend is communicating with the database
if (err) {
console.error("Error connecting to the database:", err);
return;
}
console.log("Database connection established");
});

module.exports = db;
```

# Important Things to Keep in Mind

#### 1. Most variable names are written in Spanish.

#### 2. The variables `contraseña` and `contrasena` may appear inconsistent, but this is due to both Node.js configuration and database variable configuration. They must remain exactly as they are for proper functionality.

#### 3. The backend and frontend are separated individually, which is why it is important to read the following section to understand how to configure both servers.

# Server Configuration and Connection

## Frontend Server

This server is responsible for rendering the entire frontend, making requests to the backend server, and performing validations before and after user interaction.

## Frontend Server Configuration

This server uses the default `create-react-app` configuration, which runs by default on port `3000` with the URL:

```txt
Local: http://localhost:3000
```

To initialize the server, open PowerShell or any command console, navigate to the path `../cuentasdjreact/frontend`, and execute the command:

```bash
npm start
```

If everything went correctly, a confirmation message saying `webpack compiled successfully` will appear in the console.

## Backend Server Configuration

This server requires a different configuration because it must run on a different port from the frontend.

If we navigate to the path `../backend/app.js`, we can see on line 28 that port `4000` is selected.

This port can be modified as desired, taking into account that the frontend components must also be updated to call the new assigned port.

## Launching the Backend

To launch this server, open the console as before and navigate to the path `../cuentasdjreact/backend`, then execute the command:

```bash
node app
```

If everything went correctly, the console will display the confirmation message:

```txt
Servidor corriendo en http://localhost:4000
Conexión a la base de datos establecida
```

## MySQL Server Configuration

In this project, MySQL Workbench was used, which allows us to create a local server for our databases. To create this local server, you can follow a simple tutorial.

In this case, the most simplified tutorial can be found at:
https://youtu.be/aA_qp6pqbPI?si=MTMvh0Hb7gRI16T8 || credits: VerTutoriales

Here it explains how to create the server connection, and previously we already configured this database.
[configuration](#3-database-configuration)

## Recommendations Before Launching the Servers

- Verify that the backend and frontend are using the correct ports.
- Verify that no other server is running simultaneously on those ports.
- Verify that if you make any small changes, whether in routes or ports, you also update all components where they are used.

### Final Feedback

This project represents a practical implementation of a user management system with a clear focus on security, data validation, and separation of responsibilities between frontend and backend.

Throughout its development, important concepts were applied such as:

- JWT-based authentication
- Password encryption using bcrypt
- User role management (administrator / regular)
- Client-side and server-side validations
- Structured error handling
- Use of environment variables to protect sensitive information
- Complete integration between frontend, backend, and database

#### Keep in mind that this project is currently focused on a testing environment and aims to be adapted and improved for a real production environment, so many changes and configurations are still pending and will continue to be implemented over time. Additionally, this project currently has only one collaborator, which increases development time, feature implementation time, and the correction of possible errors.

### AND IF YOU ARE READING THIS, YOUR STAR WOULD HELP ME A LOT ⭐
