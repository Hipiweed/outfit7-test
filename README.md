#### Database configuration

First you will need a MySQL server running.

Use MySQL Workbench. Connect to database as administrator. Right-click on empty space (bottom-left) below the listing of schemas. Choose `Create schema`.

- Schema name: outfit7
- Character set: utf8mb4

Create user `outfit7``
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

You will need to create a .env