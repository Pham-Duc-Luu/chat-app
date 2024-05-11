CREATE USER user_service WITH PASSWORD 'user_service';

CREATE DATABASE user_db;

GRANT ALL PRIVILEGES ON DATABASE user_db TO user_service;


\c auth_db;

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL ,
  password VARCHAR(255) NOT NULL
);
