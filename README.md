## Getting started

### Install necessary software

For this application to work you need node js.

Node.js can be downloaded here: https://nodejs.org/en/download/ 
 
<mark>If you already have Node.js, make sure you have the latest software</mark>


### Built With

* Node
* React
* Bootstrap
* Typescript



## Create databases for tests and the application

Create two databases, one for tests and one for the application. 

In the database for the application, Copy the `database.sql` file in root directory and run the mysql queries.

Head into the test database and Copy the `testdatabase.sql` file
located in `server/test` and run the mysql queries. 


### Setup database connections

You need to create two configuration files that will contain the database connection details. These
files should not be uploaded to your git repository, and they have therefore been added to
`.gitignore`. The connection details may vary, but example content of the two configuration files
are as follows:

`server/config.ts`:

```ts
process.env.MYSQL_HOST = 'database-host';
process.env.MYSQL_USER = 'username';
process.env.MYSQL_PASSWORD = 'password';
process.env.MYSQL_DATABASE = 'database_name';
```

`server/test/config.ts`:

```ts
process.env.MYSQL_HOST = 'database-host';
process.env.MYSQL_USER = 'username';
process.env.MYSQL_PASSWORD = 'password';
process.env.MYSQL_DATABASE = 'database_name_test';
```

These environment variables will be used in the `server/src/mysql-pool.ts` file.

For the app to work, it needs predefined tags. These can be added like this:

```sql
INSERT INTO Tags (tag_id, name) VALUES 
(1, 'SQL'),
(2, 'Python'),
(3, 'JavaScript'),
(4, 'HTML'),
(5, 'CSS'),
(6, 'Bootstrap'),
(7, 'Frontend'),
(8, 'Backend');
```

## Start server 

Install dependencies and start server:

```sh
cd server
npm install
npm start
```

### Run server tests:

```sh
cd server
npm test
```

## Bundle client files to be served through server

Install dependencies and start client:

```sh
cd client
npm install 
npm start
```

### Run client tests:

```sh
cd client
npm test
```

## Creators

Simon Zahl

Bjørne-Morgan Øvreås

Frederik Andreas Lunde 

Ingrid-Margrethe Theodorsen