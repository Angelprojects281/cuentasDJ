CREATE DATABASE IF NOT EXISTS auditoria
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE auditoria;

CREATE TABLE actividad_sistema (
    idactividad_sistema INT NOT NULL AUTO_INCREMENT,
    fecha DATE NOT NULL,
    tipo_actividad VARCHAR(45) NOT NULL,
    detalles VARCHAR(500) NOT NULL,
    
    PRIMARY KEY (idactividad_sistema)
);