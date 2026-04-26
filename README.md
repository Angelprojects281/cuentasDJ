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

```
correo= (aqui se coloca el correo gmail al que llegaran los correos)
contrasena= (aqui pondras la contraseña de aplicacion que te dara google automaticamente, NO PONER TU CONTRASEÑA REAL||     enlace tuto para generar la contraseña: https://youtube.com/shorts/QzR0SnqcHbo?si=S1EEUTVjZ3g1PMv-  || creditos:     TechForest)
```

- Archivo llamado "secretKey.env" que debe tener el siguiente contenido:
  ```
  JWT-SECRET= (aqui va una contraseña de tu preferencia, prioriza que sea segura)
  ```

### 3. configuracion de la base de datos:

3.1: para configurar la base de datos debes realizar la creacion de la tabla ya sea en la consola de comandos de tu servidor o ejecutando el comando directamente en MySQL Workbench.

3.2: comando para la creacion de la base de datos:

- En el siguiente comando se crea la base de datos, se crea la tabla con los campos requeridos y se crea un usuario por defecto para inicio de sesion:

- Crear base de datos

```
 CREATE DATABASE IF NOT EXISTS cuentasdjusers
 CHARACTER SET utf8mb4
 COLLATE utf8mb4_0900_ai_ci;

 -- Usar la base de datos
 USE cuentasdjusers;

 -- Eliminar tabla si existe
 DROP TABLE IF EXISTS usuarios;

 -- Crear tabla
 CREATE TABLE usuarios (
 idUsuarios VARCHAR(20) NOT NULL,
 contraseña VARCHAR(255) NOT NULL,
 Rol VARCHAR(15) NOT NULL DEFAULT 'regular',
 codigo_verificacion VARCHAR(6) DEFAULT NULL,
 codigo_expiracion DATETIME DEFAULT NULL,
 nueva_contraseña VARCHAR(255) DEFAULT NULL,
 PRIMARY KEY (idUsuarios),
 UNIQUE KEY idUsuarios_UNIQUE (idUsuarios)
 ) ENGINE=InnoDB;

 -- Insertar usuario administrador por defecto
 INSERT INTO usuarios (
 idUsuarios,
 contraseña,
 Rol,
 codigo_verificacion,
 codigo_expiracion,
 nueva_contraseña
 ) VALUES (
 'admin',
 '$2a$10$/Urr3jVrFlXwqcHqD9eZ2eTgtChNUdsUhAq8atUBOnU06KPYTQdw6',
 'admin',
 NULL,
 NULL,
 NULL
 );
```

Para realizar el inicio de sesion se crea un usuario por defecto con credenciales:

```
  Usuario: Admin
  contraseña: Admin
```

la contraseña se genera con un hash de bcrypt externo, y ya que el backend tenga acceso a la base de datos usara la dependencia bcrypt para comparar la contraseña en texto plano en el modulo de inicio de sesion con la contraseña guardada en la base de datos.

3.3: conexion a la base de datos:

para conectar tu base de datos debes dirigirte a la ruta "/backend/config/db.js
aqui encontraras y modificaras el siguiente contenido:

```
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
  });

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

##### In English.

# Project CuentasDJ

## Project context:

- This is a practical project that utilizes technologies like React, Node.js, and MySQL. Its purpose is to simulate an account and user management system for a food-related company. The goal is not only to manage accounts effectively, but also to create a system with a strong focus on security and handling sensitive data.

## Current status of the project:

- At this very moment, the project already includes modules for managing users, such as:

1.  Creation of new users
2.  User deletion
3.  \-Security validations/Verifications
4.  \-Specific error handling, both common user errors and complex server errors
5.  \-Real database management with MySQL
6.  \-Real user interaction with route protections and access protection

## Main dependencies and libraries you must install for its operation:

1.  frontend:
    - @testing-library/dom: Tools for reliably testing the DOM.
    - @testing-library/jest-dom: Extends Jest with DOM-specific assertions to validate DOM elements.
    - @testing-library/react: Facilitates testing of React components by simulating their real behavior.
    - @testing-library/user-event: Allows simulating user interactions in automated tests.
    - jwt-decode: A utility for decoding JWT tokens on the client side.
    - React: The main library for building user interfaces.
    - react-dom: Handles the rendering of React components in the browser.
    - react-idle-timer: Detects user inactivity within the application.
    - react-router-dom: Handles navigation and routing in React applications.
    - react-scripts: Provides the base configuration and development scripts for the application.
    - web-vitals: Allows measuring key web performance metrics.
    - zxcvbn: Evaluates the strength of passwords entered by the user.

2.  backend:
    - bcrypt: Library for securely hashing passwords.
    - Cors: A middleware that enables and configures cross-domain access (Cross-Origin Resource Sharing).
    - dotenv: Allows for managing environment variables from .env files.
    - Express: A web framework for Node.js, used for building APIs and handling server routes.
    - jsonwebtoken: It implements the generation and validation of JWT tokens for authentication and authorization purposes.
    - mysql2: A MySQL client for Node.js that offers efficient querying capabilities and support for promises.
    - nodemailer: A tool for sending emails from the server.

# How to set it up for use and testing:

### Installing dependencies:

Make sure to install each of the dependencies mentioned earlier. In this project, the latest versions of each dependency were used.

### 2\. Creating .env files for tokens and emails:

This project uses a centralized user management system controlled by administrators. In other words, all emails related to codes are sent to a single administrator’s email address.

2.1: After having the folders in your local repository, you need to create the following files specifically:

### In the /backend/ directory (the root directory of the backend):

- The file called “contrasena.env” should contain the following content:

```
correo= (Enter the Gmail address where you want to receive emails here)
contrasena= (Enter the app password that Google will automatically generate here. DO NOT ENTER YOUR ACTUAL PASSWORD|| Link to the tutorial for generating the password: https://youtube.com/shorts/QzR0SnqcHbo?si=S1EEUTVjZ3g1PMv- || Credits: TechForest)
```

- There’s a file called “secretKey.env”, which must contain the following content:

  ```
  JWT-SECRET= (Here's a password of your choice—make sure it's secure)
  ```

### 3\. Database configuration:

3.1: To configure the database, you need to create the tables either in the command-line interface of your server, or by executing the commands directly in MySQL Workbench.

3.2: command for database creation:

- In the following command, the database is created, the table with the required fields is created, and a default user is created for login:
- Create database

```
 CREATE DATABASE IF NOT EXISTS cuentasdjusers
 CHARACTER SET utf8mb4
 COLLATE utf8mb4_0900_ai_ci;

 -- Usar la base de datos
 USE cuentasdjusers;

 -- Eliminar tabla si existe
 DROP TABLE IF EXISTS usuarios;

 -- Crear tabla
 CREATE TABLE usuarios (
 idUsuarios VARCHAR(20) NOT NULL,
 contraseña VARCHAR(255) NOT NULL,
 Rol VARCHAR(15) NOT NULL DEFAULT 'regular',
 codigo_verificacion VARCHAR(6) DEFAULT NULL,
 codigo_expiracion DATETIME DEFAULT NULL,
 nueva_contraseña VARCHAR(255) DEFAULT NULL,
 PRIMARY KEY (idUsuarios),
 UNIQUE KEY idUsuarios_UNIQUE (idUsuarios)
 ) ENGINE=InnoDB;

 -- Insertar usuario administrador por defecto
 INSERT INTO usuarios (
 idUsuarios,
 contraseña,
 Rol,
 codigo_verificacion,
 codigo_expiracion,
 nueva_contraseña
 ) VALUES (
 'admin',
 '$2a$10$/Urr3jVrFlXwqcHqD9eZ2eTgtChNUdsUhAq8atUBOnU06KPYTQdw6',
 'admin',
 NULL,
 NULL,
 NULL
 );
```

To perform login, a default user is created with credentials:

```
  User: Admin
  password: Admin
```

The password is generated using an external bcrypt hash. Since the backend has access to the database, it uses the bcrypt library to compare the plain-text password entered during login with the password stored in the database.

3.3: Connecting to the database:

To connect your database, you need to go to the path “/backend/config/db.js”. There, you’ll find and be able to modify the following content:

```
    const mysql = require("mysql2");

  const db = mysql.createConnection({
    host: "localhost", -> the host of your database server
    user: "root", -> the username you have set up on your server
    password: "sqlCuentasdj", -> your server password
    database: "cuentasdjUsers", -> the database we created earlier
  });

  db.connect((err) => { -> Do not modify this; it verifies that the backend is communicating with the database.
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      return;
    }
    console.log("Conexión a la base de datos establecida");
  });

  module.exports = db;
```

# Things to keep in mind

#### The names of the variables are, for the most part, in Spanish.

#### The variables “contraseña” and “contrasena” can be considered inconsistent with each other. However, this is due to the configuration of both Node.js and the database settings. These variables should be left as they are in order for everything to function properly.

#### The backend and frontend are separate entities. Therefore, it’s important to read the following section in order to understand how to configure both servers.

# server configuration and connection

### Frontend server:

This server is responsible for rendering the entire frontend portion of the website. It also makes requests to the backend server and performs various validations before and after user interactions.

## Configuration of the frontend server

This server uses the default configuration of `create-react-app` . By default, it runs on port 3000, with the URL `Local: http://localhost:3000` .

To start the server, we’ll use PowerShell or any command-line interface. We’ll navigate to the `../cuentasdjreact/frontend` path, and once there, we’ll execute the `npm start` command. If everything goes well, a confirmation message will appear in the console, stating `webpack compiled successfully` .

## Configuration of the backend server

On this server, we need to apply a different configuration, as it needs to run on a different port from the frontend.

If we look at the route `../backend/app.js` , we can see that on line 28, port 4000 is selected. This port can be changed as desired, but it’s important to note that we’ll also need to modify the frontend components so that they can communicate with the newly assigned port.

## Release of the backend

To launch this server, we need to open the console as before, navigate to the path `../cuentasdjreact/backend` , and then execute the command `node app` there. If everything goes well, the console will display the confirmation message `Servidor corriendo en http://localhost:4000 Conexión a la base de datos establecida` .

## MySQL server configuration

Here, we’ve used MySQL Workbench. This tool allows us to create a local server for our databases. To set up this local server, we can follow a simple tutorial. The simplest tutorial can be found at: https://youtu.be/aA\_qp6pqbPI?si=MTMvh0Hb7gRI16T8 || Credits: VerTutoriales

Here, it shows us how to establish a connection to the server. Previously, we’ve already completed the configuration of this database. Configuration.

## Recommendations before launching the servers

- Verify that both the backend and frontend are using the correct ports.
- Verify that no other server is running on that port at the same time.
- Make sure that if you make any minor changes, whether to the routes or ports, you also update all the components that use those changes.

### Final feedback/Comments

This project represents a practical implementation of a user management system that places strong emphasis on security, data validation, and the separation of responsibilities between the frontend and backend components.

Throughout its development, important concepts were applied, such as:

- Token-based authentication (JWT)
- Password encryption using bcrypt
- Managing user roles (administrator/regular user)
- Validations are performed on both the client-side and the server-side.
- Structured error handling
- Using environment variables to protect sensitive information
- Full integration between frontend, backend, and database

#### we take into account that this project is currently focused on a test environment and aims to be adapted and improved for a real production environment, so many changes and configurations are missing that will be implemented over time, in addition to this project only having one collaborator, which increases development time, the implementation of features, and the correction of possible errors.

### And if you are reading this, you would help me a lot with your star⭐
