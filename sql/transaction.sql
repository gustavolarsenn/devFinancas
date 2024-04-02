CREATE TABLE transaction (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_id BIGINT,
    user_id BIGINT,
    type VARCHAR(50),
    date DATETIME,
    created_at DATETIME,
    value FLOAT,
    FOREIGN KEY (category_id) REFERENCES category (category_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);