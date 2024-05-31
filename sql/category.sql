CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255),
    user_id BIGINT
);

INSERT INTO categories (category_name, user_id) VALUES 
('Alimentação', 0),
('Transporte', 0),
('Moradia', 0),
('Saúde', 0),
('Educação', 0),
('Lazer', 0),
('Esporte', 0);