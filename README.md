# Telegram Bot for Automated Task Management

## Objective

To evaluate your proficiency in working with the Telegram Bot API, handling asynchronous operations, and managing persistent data using Node.js.

## Overview

This project implements a CRUD RESTful API for managing tasks, using Node.js and Express with PostgreSQL. This is part of a larger task to create a Telegram bot for managing tasks for a team.

## Features Implemented

1. **Create Task**: Allows users to create a new task.
2. **Update Task**: Allows users to update an existing task.
3. **Delete Task**: Allows users to delete a task.
4. **List Tasks**: Allows users to list all their tasks.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- PostgreSQL

### Installation

1. **Clone the repository:**:

   ```bash
   git clone https://github.com/ismailkhan4/task-manager.git
   cd task-manager

2. **Install dependencies:**:
  
  ```bash
    npm install
```
3. **Configure the database:**

Create a PostgreSQL database and update the config/config.json file with your database credentials.

2. **Run database migrations:**:
  
  ```bash
    npm run migrate
```
2. **Start the server:**:
  
  ```bash
    npm run start
```

### API Endpoints

- Create Task: `POST /tasks`
    - Request body:
  ```bash
    {
      "description": "Task description",
      "due_date": "YYYY-MM-DD"
    }
  ```
  - Update Task: `PUT /task/:id`
    - Request body:
  ```bash
    {
      "description": "Updated task description",
      "due_date": "YYYY-MM-DD"
    }
  ```
  - Delete Task: `DELETE /task/:id`
  - Get Task: `GET /tasks`
