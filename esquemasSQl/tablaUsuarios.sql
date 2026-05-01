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