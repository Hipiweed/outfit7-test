#### Database configuration

First you will need a MySQL server running.

Use MySQL Workbench. Connect to database as administrator. Right-click on empty space (bottom-left) below the listing of schemas. Choose `Create schema`.

- Schema name: outfit7
- Character set: utf8mb4

Create user `outfit7`
Choose `Users and Privileges`, add new user (username + password)
On user set in `Schema priviledges` tab: add entry, set select all (priviledges), Apply.    

## Creation of database on server

```
sudo mysql
CREATE USER 'newuser'@'localhost' IDENTIFIED BY '********';
create database digozd
GRANT ALL PRIVILEGES ON outfit7.* TO 'outfit7'@'localhost';
FLUSH PRIVILEGES;
```
## Enviroment variables

You will need to create a .env in apps/be root
example:
```
   // Databease config
   DB_HOST=>> Database host <<
   DB_DATABASE=>> Database name <<
   DB_USER=>> user name <<
   DB_PASS=>> user password <<
```
## Development

Project has turbo so you will need to run in main file so were you have your turbo.json

`npm install` fist install package

`npm run dev` this will start both fe: http://localhost:5173/ and be: http://localhost:3000/

You can see swager docs on http://localhost:3000/api

## Production

Project has turbo so you will need to run in main file so were you have your turbo.json

`npm install` fist install package

`npm run build` will build both fe and be dist

`npm run start:prod` this will run prodcution version








