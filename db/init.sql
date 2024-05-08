CREATE TABLE
    IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        magic_token VARCHAR(255) NOT NULL,
        given BOOLEAN DEFAULT FALSE
    );