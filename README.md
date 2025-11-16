# ATC Online Shop Supabase API

This project is a backend API for an online shop, utilizing Supabase as the database solution. It is designed to handle various operations related to products, users, and orders.

## Features

- User authentication and authorization
- CRUD operations for products
- Order management
- Integration with Supabase for data storage

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- A Supabase account and project

### Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the project directory:

   cd atc-online-shop-supabase-api

3. Install the dependencies:

   npm install

4. Create a `.env` file in the root directory and add your Supabase credentials. You can use the `.env.example` file as a reference.

### Environment Variables

The following environment variables are required:

- `SUPABASE_URL`: The URL of your Supabase project.
- `SUPABASE_ANON_KEY`: The public API key for your Supabase project.
- `PORT`: The port on which the server will run (default is 3000).

### Running the Application

To start the server, run:

npm start

The server will be running on `http://localhost:3000`.

### API Documentation

Refer to the code comments and controller files for detailed information on the available API endpoints and their usage.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.