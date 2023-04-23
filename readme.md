# Node.js Application with Express and MongoDB and NEXTJS for frontend UI components

This is a Node.js application that uses the Express framework and MongoDB database to fetch and display data in a table format. The frontend of the application is developed using NEXTJS

## Deployed url

### Frontend
https://frontend-assign.vercel.app/

### Backend
https://backendassign.onrender.com

The backend is built using Node.js and Express framework. MongoDB database is used as a data store, and Mongoose is used as to connect to the database. 

## Frontend

The frontend is built using NEXTJS and styled using CSS Modules. The frontend displays the data returned from the backend API in a table format.
`Select Query button is there to query for respective query

### Backend API Endpoints

There are 5 API endpoints in the backend for fetching data based on different conditions:

1. `/query1` - Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
2. `/query2` - Male Users which have phone price greater than 10,000.
3. `/query3` - Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
4. `/query4` - Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
5. `/query5` - Show the data of top 10 cities which have the highest number of users and their average income.

All of these endpoints return JSON data.
