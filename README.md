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
│ ├── models.py
│ ├── schemas.py
│ ├── requirements.txt
│ ├── venv/
│ └── instance/
│ │ ├──task_management.db
│ └── tests/
│ │ ├──test_backend.py
│
├── task-management-frontend/
│ ├── node_modules/
│ ├── public/
│ │ └── favicon.ico
│ │ └── index.html
│ │ └── logo192.png
│ │ └── logo512.png
│ │ └── manifest.json
│ │ └── robots.txt
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── App.test.js
│ │ └── index.css
│ │ └── logo.svg
│ │ └── reportWebVitals.js
│ │ └── setupTests.js
│ ├── package.json
│ ├── package-lock.json
│ ├── README.md
│ └── .gitignore
│
├── .gitignore
├── LICENSE
└── README.md

## Setup Instructions
1. Backend:
```bash
cd task-management-backend
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
python app.py

2. Frontend:
bash
Copy Code
cd task-management-frontend
npm install
npm start


# Day 1 Achievements
  - Configured Flask/SQLite backend
  - Initialized React frontend
  - Verified API-database connection
   
📌 **Day 1 Requirements Met**
+ Flask project initialized
+ SQLite database configured
+ React project created
+ Git version control set up
+ Basic API endpoint tested

# Day 2 Achievements  
- Implemented full CRUD operations  
- Added field validation & error handling  
- Created unit tests for all endpoints  
- Established foreign key relationships  

📌 **Day 2 Requirements Met**  
+ ✅ RESTful API with CRUD endpoints  
+ ✅ Database schema with constraints  
+ ✅ Status field validation  
+ ✅ Unit tests for 400/404/500 errors  
+ ✅ API documentation in README  