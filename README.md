# Task Management Application

A full-stack task management application built with Flask (Backend) and React (Frontend), featuring CRUD operations and a responsive user interface.

## Technologies Used

### Backend
- Flask (Python)
- SQLite Database
- Flask-SQLAlchemy (ORM)
- Flask-Marshmallow (Serialization)
- Flask-JWT-Extended (Authentication)
- Flask-CORS (Cross-Origin Resource Sharing)

### Frontend
- React
- React Router DOM
- Axios (API calls)
- CSS3 (Styling)

## Features

- Create, Read, Update, and Delete tasks
- Responsive design for mobile and desktop
- Form validation
- Error handling
- Loading states
- User-friendly interface
- Status tracking for tasks (Pending, In Progress, Completed)

## Project Structure

```bash
task-management-app/
├── task-management-backend/
│   ├── app.py                 # Flask application
│   ├── init_db.py
│   ├── models.py             # Database models
│   ├── schemas.py            # Marshmallow schemas
│   ├── tests/                # Unit tests
│   └── requirements.txt      # Python dependencies
│
└── task-management-frontend-new/
    ├── public/               # Static files (index.html)
    └── src/
        ├── components/       # React components
        ├── services/         # API services
        └── styles           # CSS styles
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
python init_db.py
python app.py

2. Frontend:
bash
cd task-management-frontend
npm install
npm start

API Endpoints: 
GET /api/tasks - Get all tasks
GET /api/tasks/<id> - Get single task
POST /api/tasks - Create new task
PUT /api/tasks/<id> - Update task
DELETE /api/tasks/<id> - Delete task

Implementation Details
Backend Architecture:
Flask RESTful API with SQLite database
SQLAlchemy ORM for database operations
Marshmallow for serialization
Comprehensive error handling
CORS support for frontend integration

Frontend Architecture:
React components for modular design
React Router for navigation
Axios for API communication
Responsive CSS for mobile support
Form validation and error handling

Design Choices:
SQLite Database: Chosen for simplicity and portability
Flask Framework: Selected for its lightweight nature and easy setup
React: Used for its component-based architecture and efficient rendering
CSS Styling: Custom CSS for complete control over design and responsiveness

Testing:
Backend tests using pytest
API endpoint testing
Error handling verification
Database operation validation

Future Enhancements:
User authentication with JWT
Role-based access control
Task categories and filtering
Due dates and reminders
Task sharing capabilities