# Library Management System using React and Node.js

## Project Overview

This project implements a Library Management System with a React (Vite) frontend and a Node.js(Express) backend. The backend uses a NoSQL MongoDB database.  
This library allows readers to add their favorite books to their own library, with informations such as the title, the author, the genre, and a picture.
They can also add their own books, if they are not already in the database.

## Installation Requirements

-   **Node.js:** Ensure that Node.js is installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

-   **MongoDB:** You can download MongoDB from [https://www.mongodb.com/]

-   **Dependencies:** Navigate to the project directory in the terminal and run the following command to install the project dependencies:

    ```bash
    npm install
    ```

## Tech Stack

**Frontend:**

-   HTML
-   CSS
-   JavaScript / React, Vite

**Backend:**

-   Node.js
-   Express

## How to run

1. **Start the MongoDB Server:**
   Ensure your MongoDB Database is working.

2. **Run the Node.js Server:**
   Execute the following command to start the Node.js server:

    ```bash
    node server.js
    ```

    The server will run on [http://localhost:3000](http://localhost:3000).

3. **Access the Application:**
   Open your web browser and go to [http://localhost:5173](http://localhost:5173) to access the Library Management System.

## Usage

## Notes

-   Ensure that the MongoDB database is connected before starting the Node.js server.
-   Modify the MongoDB parameters in your own `config.env` according to your setup.
-   Feel free to explore and enhance the system based on your requirements! If you encounter any issues or have suggestions, please create an issue on [GitHub](https://github.com/your-repository).
