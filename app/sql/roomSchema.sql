
CREATE TABLE IF NOT EXISTS "rooms" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT
);

CREATE TABLE IF NOT EXISTS "messages" (
    "id" SERIAL PRIMARY KEY,
    "roomid" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "name" VARCHAR(50) NOT NULL,
    "text" TEXT,
    "email" VARCHAR(255) NOT NULL, 
    "cd" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
