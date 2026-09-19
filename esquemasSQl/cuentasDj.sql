CREATE DATABASE IF NOT EXISTS cuentasdj
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

USE cuentasdj;

-- =====================================================
-- TABLA USUARIOS
-- =====================================================

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    idUsuarios VARCHAR(20) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    Rol VARCHAR(15) NOT NULL DEFAULT 'regular',
    codigo_verificacion VARCHAR(6) DEFAULT NULL,
    codigo_expiracion DATETIME DEFAULT NULL,
    nueva_contraseña VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (idUsuarios),
    UNIQUE KEY idUsuarios_UNIQUE (idUsuarios)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- USUARIO ADMINISTRADOR
-- Contraseña: admin
-- Hash bcrypt con 10 rounds
-- =====================================================

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


-- =====================================================
-- TABLA PRODUCCION
-- =====================================================

CREATE TABLE IF NOT EXISTS produccion (
    idProduccion INT NOT NULL AUTO_INCREMENT,
    turno VARCHAR(45) NOT NULL,
    fecha_prod DATE NOT NULL,
    proveedor_rinde VARCHAR(45) NOT NULL,
    lote_rinde INT NOT NULL,
    num_canecas_rinde INT NOT NULL,
    litros_caneca_rinde INT NOT NULL,
    griego_inicio INT NOT NULL DEFAULT 0,
    agitado_inicio INT NOT NULL,
    suma_baches INT NOT NULL,
    kilos_baches_total INT NOT NULL,
    agitadas_final INT NOT NULL,
    descolgadas_final INT NOT NULL DEFAULT 0,

    PRIMARY KEY (idProduccion),
    UNIQUE KEY idProduccion_UNIQUE (idProduccion)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- TABLA BACHE
-- =====================================================

CREATE TABLE IF NOT EXISTS bache (
    idBache INT NOT NULL AUTO_INCREMENT,
    proveedor VARCHAR(45) NOT NULL,
    lote INT NOT NULL,
    canecas_bache INT NOT NULL,
    kilos_bache INT NOT NULL,
    griego_entregado INT NOT NULL,
    entregado_kilos INT NOT NULL,
    idProduccion INT NOT NULL,

    PRIMARY KEY (idBache),

    KEY baches_produccion_idx (idProduccion),

    CONSTRAINT baches_produccion
        FOREIGN KEY (idProduccion)
        REFERENCES produccion (idProduccion)
        ON DELETE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- =====================================================
-- TABLA AUDITORIA
-- =====================================================

CREATE TABLE IF NOT EXISTS actividad_sistema (
    idactividad_sistema INT NOT NULL AUTO_INCREMENT,
    fecha DATETIME NOT NULL,
    tipo_actividad VARCHAR(45) NOT NULL,
    detalles VARCHAR(500) NOT NULL,

    PRIMARY KEY (idactividad_sistema)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;