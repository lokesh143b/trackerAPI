Expense Tracker API
This project is an Expense Tracker API built using Node.js, Express, and SQLite with Sequelize ORM. It allows users to manage transactions and categories and generate transaction summaries. The application supports common CRUD operations for both transactions and categories and provides a summary report for income and expenses.

Table of Contents
Prerequisites
Installation
Environment Variables
Database Setup
Running the Application
API Endpoints
Transactions
Categories
Summary
Postman Screenshots
Contributing
License
Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (v14.x or later)
SQLite3 (included in the setup)
npm (Node package manager)
Installation
Clone the repository:


npm install
Set up the environment variables in a .env file (as explained below).

Environment Variables
Create a .env file in the root of the project and add the following:


PORT=3001
Change the port number if needed. If not specified, the server will default to port 3001.

Database Setup
The project uses SQLite with Sequelize ORM. The database will be automatically created and synced when the application starts. No manual setup is required for SQLite.

The SQLite database file will be generated as /database.sqlite in the project directory.

Running the Application
To start the server, run the following command:


npm start
The server will run on the port specified in the .env file or default to 3001.

API Endpoints
Transactions
GET /transactions

Get all transactions.

Example Request:


GET /transactions
Response:

json
Copy code
[
  {
    "id": 1,
    "name": "Salary",
    "amount": 5000,
    "date": "2024-10-01",
    "type": "income",
    "categoryId": 1
  }
]
GET /transactions/

Get a transaction by its ID.

Example Request:


GET /transactions/1
Response:

json
Copy code
{
  "id": 1,
  "name": "Salary",
  "amount": 5000,
  "date": "2024-10-01",
  "type": "income",
  "categoryId": 1
}
POST /transactions

Create a new transaction.

Example Request:


POST /transactions
Request Body:

json

{
  "name": "Grocery",
  "amount": 200,
  "date": "2024-10-15",
  "type": "expense",
  "categoryId": 2
}
Response:

json

{
  "id": 2,
  "name": "Grocery",
  "amount": 200,
  "date": "2024-10-15",
  "type": "expense",
  "categoryId": 2
}
PUT /transactions/

Update an existing transaction.

Example Request:


PUT /transactions/2
Request Body:

json
{
  "name": "Updated Grocery",
  "amount": 250
}
Response:

json
{
  "id": 2,
  "name": "Updated Grocery",
  "amount": 250,
  "date": "2024-10-15",
  "type": "expense",
  "categoryId": 2
}
DELETE /transactions/

Delete a transaction by its ID.

Example Request:


DELETE /transactions/2
Response:

json
{ "message": "Transaction deleted successfully" }
Categories
GET /categories

Get all categories.

Example Request:


GET /categories
Response:

json

[
  {
    "id": 1,
    "name": "Salary",
    "type": "income"
  }
]
GET /categories/

Get a category by its ID.

Example Request:


GET /categories/1
Response:

json
{
  "id": 1,
  "name": "Salary",
  "type": "income"
}
POST /categories

Create a new category.

Example Request:


POST /categories
Request Body:

json
{
  "name": "Shopping",
  "type": "expense"
}
Response:

json
{
  "id": 2,
  "name": "Shopping",
  "type": "expense"
}
PUT /categories/

Update an existing category.

Example Request:

PUT /categories/2
Request Body:

json

{
  "name": "Updated Shopping"
}
Response:

json
{
  "id": 2,
  "name": "Updated Shopping",
  "type": "expense"
}
DELETE /categories/

Delete a category by its ID.

Example Request:


DELETE /categories/2
Response:

json
{ "message": "Category deleted successfully" }
Summary
GET /transactions/summary

Get a summary of all transactions, including total income, total expenses, and balance. Optionally, filter by date range or category.

Query Parameters:

startDate: Optional start date for filtering transactions.
endDate: Optional end date for filtering transactions.
category: Optional category to filter transactions.
Example Request:


GET /transactions/summary?startDate=2024-01-01&endDate=2024-12-31
Response:

json
{
  "totalIncome": 5000,
  "totalExpenses": 200,
  "balance": 4800
}
Postman Screenshots
Here are some screenshots demonstrating the use of the API using Postman:

GET /transactions

POST /transactions

GET /transactions/summary

GET /categories