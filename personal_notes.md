# Personal Notes on VitaTrack - A Personal Health Tracker App Backend

## Updated Folder Structure

```bash
├── VitaTrack
│   ├── controllers
│   │   ├── userController.js
│   │   ├── achievementController.js
│   │   ├── allergyController.js
│   │   ├── medicationController.js
│   ├── db
│   │   ├── dbConfig.js
│   │   ├── schema.sql
│   │   ├── seed.sql
│   ├── node_modules
│   ├── queries
│   │   ├── userQueries.js
│   │   ├── achievementQueries.js
│   │   ├── allergyQueries.js
│   │   ├── medicationQueries.js
│   ├── validations
│   │   ├── validateUsers.js
│   │   ├── createUserValidator.js
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   ├── personal_notes.md
│   ├── README.md
│   ├── server.js
```

## Important Changes and Concepts

The `dbConfig.js` held most of my confusion as I did not attend the classes that covered this, so I will do my best to explain it here.

```js
const pgp = require("pg-promise")({});

require("dotenv").config();

const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;

const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30, // max number of clients in the pool
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
    };

const db = pgp(cn);

module.exports = db;
```

Even though some of this is fairly self-explanatory, I will go through it line by line to help myself understand it better.

```js
const pgp = require("pg-promise")({});
```

This line imports the `pg-promise` library and calls it with an empty object. This is the same as calling `pgp()`. But what is `pg-promise`? It is a library that allows us to interact with our database using promises. It is a wrapper for the `node-postgres` library.

The next line is this:

```js
require("dotenv").config();
```

This line imports the `dotenv` library and calls it. This allows us to use the `.env` file to store our environment variables. This is important because we do not want to expose our database credentials to the public. The `.env` file is in the `.gitignore` file so it will not be pushed to GitHub. This was explained in class but I just want to make sure to include it here so I remember.

The next few lines are this:

```js
const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;
```

This line is using object destructuring to pull the environment variables from the `process.env` object. This is the same as doing this:

```js
const DATABASE_URL = process.env.DATABASE_URL;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_USER = process.env.PG_USER;
```

The next line is this:

```js
const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30, // max number of clients in the pool
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
    };
```

This line is using a ternary operator to check if the `DATABASE_URL` environment variable exists. If it does, it will use the object on the left side of the `:`. If it does not, it will use the object on the right side of the `:`. This is the same as doing this:

```js
let cn;

if (DATABASE_URL) {
  cn = {
    connectionString: DATABASE_URL,
    max: 30, // max number of clients in the pool
    ssl: { rejectUnauthorized: false },
  };
} else {
  cn = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
  };
}
```

But let's dive a little futher. What is the `DATABASE_URL` environment variable? It is a string that contains the credentials to connect to our database. It is in the format of:

```js
postgres://username:password@host:port/database
```

The `username` and `password` are the credentials to connect to the database. The `host` is the IP address of the database. The `port` is the port number of the database. The `database` is the name of the database.

The next line is this:

```js
const db = pgp(cn);
```

This line is using the `pgp` function from the `pg-promise` library to connect to the database. It is passing in the `cn` object that we created earlier. This is the same as doing this:

```js
const db = pgp({
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USER,
});
```

The last line is this:

```js
module.exports = db;
```

This line exports the `db` object so we can use it in other files.

The reason I'm explaining all this is because in the `userQueries.js` file, even though I wrote the code to access the database, I did not include the `const db = require("../db/dbConfig");` line. Hence my connection to the database was returning `null`. At this moment I would like to thank my classmates Ariunna and Vandhana for helping me out figure out this bug.

## Using Postgres...UGHHHHH

So from the title above you can notice my frustration with Postgres. It was installed properly at the begining of the module but I believe that with all my shutting down and restarting of my laptop something might've happened. So I'm going to write down as much as I can remember about the process of figuring out this bug.

First when I opened up my terminal and typed in `psql` I got this error message:

```bash
psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: No such file or directory
	Is the server running locally and accepting connections on that socket?
```

and when I opened the Postgres app I got this error message:

```bash
The data directory contains a postmaster.pid file, which usually means that the server is already running. When the server crashes or is killed, you have to remove this file before you can restart the server. Make sure that the database process is definitely not running anymore, otherwise your data directory will be corrupted.
```

Just for my curiousity let's find out what the `postmaster.pid` file is. It is

## `postmaster.pid` file deep dive? sort of...

The `postmaster.pid` file is created by PostgreSQL, an open-source relational database management system, to track the process ID (PID) of the running PostgreSQL server. The presence of this file indicates that the server is already running.

In the event of a server crash or if the server is forcefully terminated, the `postmaster.pid` file may not be properly cleaned up, and attempting to start the server again will result in an error message indicating that the server is already running. To resolve this issue and restart the server, the `postmaster.pid` file must be removed.

## How to remove the `postmaster.pid` file

I was instructed by chatGPT that first we must make sure that the PostgreSQL server process is not running. To do this we must run the following command:

```bash
ps aux | grep postgres
```

This command will list all processes containing the word `postgres`. If the server is running, the output will look something like this:

```bash
postgres  2123  0.0  0.0  24792  1368 ?        S    12:22   0:00 /usr/lib/postgresql/12/bin/postgres -D /var/lib/postgresql/12/main -c config_file=/etc/postgresql/12/main/postgresql.conf
```

Naturally I followed this advice right now I don't remember what exactly was the output of the terminal but I just know that it did not work.

Next step was to find the `postmaster.pid` file. `chatGPT` said the the location of the file is `/usr/local/var/postgres/postmaster.pid`. At least in my laptop that was not the case. Instead the file was in:

```bash
~ cd /Library/Application\ Support/Postgres/var-15/postmaster.pid
```

and to remove it I ran the following command:

```bash
~ sudo rm /Library/Application\ Support/Postgres/var-15/postmaster.pid
```

After that I opened the Postgres app and it worked. The `psql` command also worked on my terminal. Hooray SUCCESS!!!
