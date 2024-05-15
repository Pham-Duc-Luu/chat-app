CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    resetCode VARCHAR(255),
    resetCodeCreatedAt TIMESTAMPTZ
);

INSERT INTO "User" (username, email, password, resetCode, resetCodeCreatedAt)
VALUES ('example_username', 'example@email.com', 'example_password', NULL, NULL);

INSERT INTO "User" (username, email, password, resetCode, resetCodeCreatedAt)
VALUES ('pham duc luu', 'phamducluu2003@email.com', 'Phamluu2003.', NULL, NULL);

INSERT INTO "User" (username, email, password)
VALUES ('pham luu', 'phamluudeptrai@email.com', 'Phamluu2003.');