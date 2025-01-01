CREATE TABLE IF NOT EXISTS "rooms" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT
);

CREATE TABLE IF NOT EXISTS "messages" (
    "id" SERIAL PRIMARY KEY,
    "roomId" VARCHAR(255) NOT NULL,
    "text" TEXT,
    "email" VARCHAR(255) NOT NULL, 
    "cd" DATE DEFAULT CURRENT_DATE
);
