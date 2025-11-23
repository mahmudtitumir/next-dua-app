# Backend API Server

This directory contains the backend API server for the Next Dua App. The server is built using Node.js and Express.js, and it provides RESTful endpoints for managing duas, user authentication, and other related functionalities.

## Setup Instructions

1. **Install Dependencies**: Run `npm install` to install all required dependencies.
2. **Environment Variables**: Create a `.env` file in the root of the backend directory and configure necessary environment variables (e.g., database connection strings, port numbers).
3. **Database Setup**: Ensure that your database is set up and accessible. Run any necessary migrations or seed scripts to initialize the database schema and data.
4. **Start the Server**: Use `npm start` to launch the server. By default, it will run on the port specified in your `.env` file.
5. **API Documentation**: Refer to the API documentation below for details on available endpoints and their usage.

## Project API Endpoints

### Categories

- `GET /api/categories` — list all categories
- `GET /api/categories/:id` — single category
- `GET /api/categories/:id/subcategories` — subcategories in a category

### Subcategories

- `GET /api/subcategories` — list all or ?category_id=1
- `GET /api/subcategories/:id` — single subcategory
- `GET /api/subcategories/:id/duas` — all duas in that subcategory

### Duas

- `GET /api/duas` — list duas (supports ?limit=, ?offset=, ?search=, ?tag=, ?subcategory_id=, ?category_id=)
- `GET /api/duas/:id` — single dua
- `POST /api/duas` — create dua
- `PUT /api/duas/:id` — update dua
- `DELETE /api/duas/:id` — delete dua

---
