-- Crear la base de datos
CREATE DATABASE SistemaUsuarios;
GO

USE SistemaUsuarios;
GO

-- Tabla de Roles
CREATE TABLE Roles (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL
);

-- Tabla de Usuarios
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1,
    RoleID INT FOREIGN KEY REFERENCES Roles(RoleID)
);

-- Insertar roles básicos
INSERT INTO Roles (RoleName) VALUES ('Administrador'), ('Cliente');

-- Insertar ejemplo de usuario
INSERT INTO Users (Username, Email, PasswordHash, RoleID)
VALUES ('admin01', 'admin@ejemplo.com', 'hash_aqui', 1);

INSERT INTO Users (Username, Email, PasswordHash, RoleID)
VALUES ('cliente01', 'cliente@ejemplo.com', 'hash_aqui', 2);














USE [d1];
GO

-- Crear tabla si no existe
IF OBJECT_ID('dbo.items', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[items](
        [id] INT IDENTITY(1,1) NOT NULL,
        [name] NVARCHAR(100) NOT NULL,
        [description] NVARCHAR(255) NULL,
        [created_at] DATETIME NULL,
        PRIMARY KEY CLUSTERED ([id] ASC)
    );
    
    ALTER TABLE [dbo].[items] ADD DEFAULT (GETDATE()) FOR [created_at];
END
GO

-- Insertar 10 registros de ejemplo
INSERT INTO [dbo].[items] ([name], [description])
VALUES 
('Laptop Lenovo', 'Laptop de 14 pulgadas con procesador Intel i5'),
('Mouse Logitech', 'Mouse inalámbrico ergonómico'),
('Teclado Mecánico', 'Teclado retroiluminado con switches azules'),
('Monitor Samsung', 'Monitor LED de 24 pulgadas Full HD'),
('Audífonos Sony', 'Audífonos con cancelación de ruido'),
('Webcam HD', 'Cámara web 1080p para videollamadas'),
('Silla Gamer', 'Silla ergonómica con soporte lumbar'),
('Disco SSD 1TB', 'Unidad de estado sólido NVMe'),
('Router TP-Link', 'Router WiFi de doble banda'),
('Micrófono USB', 'Micrófono condensador para streaming');
GO
