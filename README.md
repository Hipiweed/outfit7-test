# Database Configuration

First, ensure that you have a running MySQL server.

To set up the database, use MySQL Workbench and connect to the database as an administrator. Right-click on an empty space (located at the bottom-left) below the listing of schemas and select `Create schema`.

- Schema name: outfit7
- Character set: utf8mb4

Next, create a user named `outfit7`. To do this, select `Users and Privileges` and add a new user by providing a username and password. In the `Schema privileges` tab for the user, add an entry, select all privileges, and click `Apply`.

## Creation of Database on Server

Execute the following commands:

```
sudo mysql
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE digozd;
GRANT ALL PRIVILEGES ON outfit7.* TO 'outfit7'@'localhost';
FLUSH PRIVILEGES;
```


## Environment Variables

Create a .env file in the apps/be root directory. Here's an example:


```
   // Database config
   DB_HOST=<< Database host >>
   DB_DATABASE=<< Database name >>
   DB_USER=<< username >>
   DB_PASS=<< password >>
```


## Development

This project uses turbo. Run the following commands in the main file where your turbo.json is located:

First, install the package:

`npm install`

Then, start the development server:

`npm run dev`

This will start both the front-end (fe) at http://localhost:5173/ and the back-end (be) at http://localhost:3000/.

Swagger documentation can be accessed at http://localhost:3000/api.

## Production

In the main file where your turbo.json is located, run the following commands:

First, install the package:

`npm install`

Then, build both the front-end and back-end distributions:

`npm run build`

Finally, run the production version:

`npm run start:prod`
