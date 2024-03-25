CREATE TABLE transacoes (
    id_transacao BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_categoria BIGINT,
    id_usuario BIGINT,
    tipo VARCHAR(50),
    data DATETIME,
    data_insercao DATETIME,
    valor FLOAT,
    FOREIGN KEY id_categoria REFERENCES categoria (id_categoria),
    FOREIGN KEY id_usuario REFERENCES usuario (id_usuario)
)