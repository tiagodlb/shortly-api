CREATE TABLE users(
    id serial NOT NULL PRIMARY KEY,
    name VARCHAR (30) NOT NULL,
    email VARCHAR (30) NOT NULL UNIQUE,
    password VARCHAR (100) NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);
CREATE TABLE sessions(
    id INTEGER NOT NULL,
    "userId" INTEGER REFERENCES "users"(id) NOT NULL,
    token TEXT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);
CREATE TABLE urls(
    id serial NOT NULL PRIMARY KEY,
    "shortUrl" TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    "userId" INTEGER REFERENCES "users"(id) NOT NULL,
    "visitsCount" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);