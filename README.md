# Task Management App

A simple task management web application where users can create, edit, delete, and mark tasks as complete. The application includes both a front-end interface and a back-end API.

## Technologies Used


- **Backend:** Flask (Python)
- **Database:** SQLite

- **Frontend:** React
- **Authentication:** JWT (planned)

- **Deployment:** Heroku

## Features


- Create, read, update, and delete tasks.
- Mark tasks as complete.

- User authentication using JWT (planned).
- Role-based access control (planned).

## Project Structure
task-management-app/
│
├── task-management-backend/
│ ├── app.py
│ ├── task_management.db
│ ├── venv/
│ └── ...
│
├── task-management-frontend/
│ ├── public/
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
│ ├── package.json
│ └── ...
│
├── .gitignore
├── LICENSE
└── README.md

## Setup Instructions

### Backend


1. Clone the repository:
   ```sh
   git clone https://github.com/Oliviaheckert/task-management-app.git
   cd task-management-app/task-management-backend

1. Create a virtual environment and activate it:
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

2. Install dependencies:
pip install -r requirements.txt

3. Run the Flask server:
python app.py


Frontend
1. Navigate to the frontend directory:
cd ../task-management-frontend

2. Install dependencies:
npm install

3. Run the React development server:
npm start


Deployment: Heroku
1. Install the Heroku CLI
2. Log in to Heroku:
heroku login

3. Create a new Heroku app:
heroku create task-management-app

4. Push the code to Heroku:
git push heroku main

5. Open the app:
heroku open
