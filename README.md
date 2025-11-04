# Admin Pembelian System

## Project Overview

This project implements a simple administration system for managing product purchases and stock. It features an admin interface for inputting new purchases and canceling existing ones, designed for a store administrator.

## Features

-   **Product Management:** View and manage product details.
-   **Stock Management:** Track and update product stock levels.
-   **Purchase Management:**
    -   Input new purchase orders.
    -   Cancel existing purchase orders.
-   **Admin Interface:** A dedicated web interface for administrative tasks.

## Technologies Used

### Backend

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web application framework for Node.js.
-   **Sequelize:** ORM (Object-Relational Mapper) for SQL databases.
-   **SQL Database:** (e.g., MySQL, PostgreSQL) for data storage.

### Frontend

-   **Next.js:** React framework for building user interfaces.
-   **React:** JavaScript library for building user interfaces.
-   **Tailwind CSS:** A utility-first CSS framework for styling.

## Database Schema

### `Produk` Table

-   `id`: Primary Key, Integer
-   `nama`: String (Product Name)
-   `harga`: Decimal (Product Price)
-   `kategori`: String (Product Category)
-   `warna`: String (Product Color)
-   `img`: String (Image URL)
-   `deskripsi`: Text (Product Description)
-   `createdAt`: DateTime
-   `updatedAt`: DateTime

### `Stock` Table

-   `id`: Primary Key, Integer
-   `produkId`: Foreign Key to `Produk` (Integer)
-   `jumlah`: Integer (Stock Quantity)
-   `createdAt`: DateTime
-   `updatedAt`: DateTime

### `Pembelian` Table

-   `id`: Primary Key, Integer
-   `produkId`: Foreign Key to `Produk` (Integer)
-   `jumlah`: Integer (Quantity Purchased)
-   `totalHarga`: Decimal (Total Price of Purchase)
-   `status`: String (e.g., 'pending', 'selesai', 'dibatalkan')
-   `tanggalBeli`: DateTime (Date of Purchase)
-   `createdAt`: DateTime
-   `updatedAt`: DateTime

## Setup and Installation

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or Yarn
-   A running SQL database server (e.g., MySQL)

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Configure Database:**
    -   Create a `.env` file in the `backend` directory based on `.env.example` (if available) or create one with your database credentials.
    -   Ensure `config/config.json` is correctly configured for your development environment.

4.  **Run Database Migrations:**
    ```bash
    npx sequelize db:migrate
    ```

5.  **Seed Initial Data (Optional, for demo products):**
    ```bash
    npx sequelize db:seed:all
    ```

6.  **Start the Backend Server:**
    ```bash
    npm start
    # or node server.js
    ```
    The backend server should now be running, typically on `http://localhost:5000`.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Configure Environment Variables:**
    -   Create a `.env.local` file in the `frontend` directory.
    -   Add your API URL to this file:
        ```
        NEXT_PUBLIC_API_URL=http://localhost:5000/api
        ```

4.  **Start the Frontend Development Server:**
    ```bash
    npm run dev
    ```
    The frontend application should now be accessible, typically on `http://localhost:3000`.

## Usage

-   Open your web browser and navigate to `http://localhost:3000` (or wherever your frontend is running).
-   Access the admin purchase page at `/admin/pembelian` to view existing purchases and add new ones.
-   Use the provided interface to input new purchase data or cancel purchases.

