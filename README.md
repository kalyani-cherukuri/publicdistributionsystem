# Public Distribution System (PDS) Management System

## Overview

The Public Distribution System (PDS) Management System is a full-stack web application developed to digitize and streamline ration distribution processes. The system enables efficient management of beneficiaries, ration cards, inventory, allocations, and distribution transactions with secure role-based access control.

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA

### Database
- MySQL

---

# Features

## Authentication & Authorization
- JWT-based authentication
- Role-based authorization
- Protected APIs
- BCrypt password encryption

---

# Roles

## ADMIN
- Create users
- Issue ration cards
- Add ration items
- Create monthly allocations
- View reports and transactions

## SHOP_MANAGER
- Manage inventory
- Update stock quantities
- Distribute ration items
- View distribution history

## BENEFICIARY
- View personal ration card
- View allocations
- View distribution history

---

# Modules

## User Management
- Create and manage users
- Assign roles
- Secure login system

## Ration Card Management
- Issue ration cards
- Manage card types
- One card per beneficiary validation

## Ration Item Management
- Add ration items
- Manage prices and unit types

## Inventory Management
- Track stock quantity
- Inventory status management
- Low stock detection

## Allocation Management
- Monthly ration allocation
- Card-type-based quantity calculation
- Inventory deduction logic

## Distribution Management
- Distribution transaction tracking
- Partial and full distribution handling
- Allocation status updates

---

# Project Structure

## Backend Structure

```text
src/main/java/com/example/distribution_backend
│
├── config
├── controller
├── dto
├── entity
├── enums
├── exception
├── repository
├── security
├── service
└── DistributionBackendApplication
```

## Frontend Structure

```text
src
│
├── layouts
├── pages
├── routes
├── components
├── services
└── App.jsx
```

---

# Database Tables

- users
- ration_cards
- ration_items
- inventory
- allocations
- distribution_transactions

---

# Security Features

- JWT Authentication
- BCrypt Password Encryption
- Protected Routes
- Role-Based Access Control
- CORS Configuration

---

# Business Rules

- One beneficiary can have only one ration card
- Only ACTIVE ration cards are eligible for allocations
- Inventory stock reduces automatically during allocation
- Distribution quantity cannot exceed allocated quantity
- Allocation statuses update automatically

---

# API Modules

## Authentication APIs
- Login API

## User APIs
- Create User
- Get All Users

## Ration Card APIs
- Create Ration Card
- Get Ration Cards

## Ration Item APIs
- Add Ration Item
- Get Ration Items
- Update Price

## Inventory APIs
- Update Inventory
- View Inventory

## Allocation APIs
- Create Allocation
- View Allocations

## Distribution APIs
- Create Distribution
- View Transactions

---

# Backend Setup

## Clone Repository

```bash
git clone <repository-url>
```

## Navigate to Backend

```bash
cd distribution-backend
```

## Configure MySQL

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pds_db
spring.datasource.username=root
spring.datasource.password=your_password
```

## Run Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd pds-frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Sample Login Credentials

## ADMIN

```text
Email: admin@gmail.com
Password: admin123
```

## SHOP_MANAGER

```text
Email: manager@gmail.com
Password: manager123
```

## BENEFICIARY

```text
Email: ravi@gmail.com
Password: 12345
```

---

# Future Enhancements

- Email notifications
- QR-based ration verification
- Analytics dashboard
- PDF/Excel report export
- Mobile responsiveness
- Pagination & filtering
- Docker deployment

---

# Author

Developed as a Java Full Stack Project using React.js, Spring Boot, MySQL, and Tailwind CSS.
