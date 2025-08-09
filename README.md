# 📱 Online Contact Agenda

A modern and feature-rich online contact management application built with Node.js, featuring a clean interface and robust backend architecture.

## ✨ Features

- **Add Contacts**: Create new contacts with name, phone number, and email
- **View Contacts**: Browse and search through your contact list
- **Edit Contacts**: Update existing contact information
- **Delete Contacts**: Remove contacts from your agenda
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: Webpack
- **Security**: Bcrypt for password hashing
- **Environment**: Environment variables with .env

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (client or MongoDB Atlas account)
- [Git](https://git-scm.com/) (for cloning the repository)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arilson21/Agenda-online.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Agenda-online
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   CONNECTIONSTRING=your_mongodb_connection_string
   ```
   
   **Note**: Replace `your_mongodb_connection_string` with your actual MongoDB connection URL.

## 🏃‍♂️ Running the Application

1. **Start the application**
   ```bash
   npm start
   ```

2. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
Agenda-online/
├── src/                 # Source code
├── public/              # Static assets
├── views/               # HTML templates
├── routes/              # API routes
├── models/              # Database models
├── middleware/          # Custom middleware
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔧 Configuration

### MongoDB Connection

The application uses MongoDB as its primary database. You can either:

- **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/agenda`
- **MongoDB Atlas**: Use a cloud-hosted MongoDB instance with your connection string

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CONNECTIONSTRING` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/agenda` |

## 📱 Usage

1. **Register/Login**: Create an account or sign in to your existing account
2. **Add Contacts**: Click "Add Contact" to create new entries
3. **Manage Contacts**: View, edit, or delete contacts as needed
4. **Search**: Use the search functionality to find specific contacts quickly
