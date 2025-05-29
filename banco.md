-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS reservas_db;

-- Selecionar o banco de dados para uso
USE reservas_db;

-- Criar a tabela de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    funcionario VARCHAR(100) NOT NULL,
    numero_sala INT NOT NULL,
    inicio DATETIME NOT NULL,
    fim DATETIME NOT NULL,
    quantidade_pessoas INT NOT NULL,
    FOREIGN KEY (numero_sala) REFERENCES salas(numero) -- Relacionamento com a tabela de salas
);

-- Criar a tabela de salas
CREATE TABLE IF NOT EXISTS salas (
    numero INT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    capacidade INT NOT NULL,
    status ENUM('livre', 'reservada') NOT NULL,
    recursos TEXT
);

-- Inserir algumas salas de exemplo
INSERT INTO salas (numero, tipo, capacidade, status, recursos) VALUES
(101, 'Comum', 40, 'livre', NULL),
(102, 'Especial', 30, 'livre', 'Projetor, Ar-condicionado'),
(103, 'Comum', 35, 'livre', NULL);

-- Inserir algumas reservas de exemplo
INSERT INTO reservas (funcionario, numero_sala, inicio, fim, quantidade_pessoas) VALUES
('João Silva', 101, '2025-06-01 08:00:00', '2025-06-01 10:00:00', 25),
('Maria Oliveira', 102, '2025-06-01 10:30:00', '2025-06-01 12:30:00', 20);
