CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255),
    user_id BIGINT,
    active BIT DEFAULT 1
);

INSERT INTO categories (category_name, user_id) VALUES 
('Alimentação', 0, 1),
('Transporte', 0, 1),
('Moradia', 0, 1),
('Saúde', 0, 1),
('Educação', 0, 1),
('Lazer', 0, 1),
('Esporte', 0, 1);