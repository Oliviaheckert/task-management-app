import os
import warnings
from datetime import timedelta

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token

from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from models import db, Task, User
from schemas import ma, task_schema, tasks_schema

# Initialize app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'sqlite:///task_management.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, db)

# Import after initialization
from models import Task
from schemas import task_schema, tasks_schema

warnings.filterwarnings("ignore", category=DeprecationWarning)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad request"}), 400

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(422)
def validation_error(error):
    return jsonify({"error": "Validation failed"}), 422

# API Routes
@app.route('/api/tasks', methods=['POST'])
def create_task():
    """Create a new task with validation"""
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 415
            
        data = request.get_json()
        
        # Validate required fields
        if not data or 'title' not in data:
            return jsonify({"error": "Title is required"}), 400
            
        if 'user_id' not in data:
            return jsonify({"error": "user_id is required"}), 400

        # Validate status if provided
        if 'status' in data and data['status'] not in Task.STATUS_CHOICES:
            return jsonify({
                "error": f"Invalid status. Valid choices: {Task.STATUS_CHOICES}"
            }), 400

        # Create task with relationship
        new_task = Task(
            title=data['title'],
            description=data.get('description', ''),
            status=data.get('status', Task.STATUS_CHOICES[0]),
            user_id=data['user_id']  # Add user relationship
        )
        
        db.session.add(new_task)
        db.session.commit()
        return task_schema.jsonify(new_task), 201
        
    except IntegrityError as e:
        db.session.rollback()
        # Handle foreign key constraint violation
        if "FOREIGN KEY constraint failed" in str(e):
            return jsonify({"error": "Invalid user_id provided"}), 400
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/users', methods=['POST'])
def create_user():
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 415
        
    data = request.get_json()

    if 'username' not in data or 'password' not in data:
        return jsonify({"error": "Username and password are required"}), 400

    try:
        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            username=data['username'], password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "id": new_user.id,
            "username": new_user.username
        }), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Username already exists"}), 409
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Update existing task with validation"""
    try:
        task = db.session.get(Task, task_id)
        if not task: 
            return jsonify({"error": "Task not found"}), 404
        data = request.get_json()
        
        if 'status' in data and data['status'] not in Task.STATUS_CHOICES:
            return jsonify({
                "error": f"Invalid status. Valid choices: {Task.STATUS_CHOICES}"
            }), 400

        # Validate and update fields
        if 'title' in data:
            if not data['title'].strip():
                return jsonify({"error": "Title cannot be empty"}), 400
            task.title = data['title']
            
        if 'description' in data:
            task.description = data['description']
            
        if 'status' in data:
            task.status = data['status']

        db.session.commit()
        return task_schema.jsonify(task), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Get all tasks"""
    try:
        tasks = Task.query.all()
        return tasks_schema.jsonify(tasks), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    """Get single task by ID"""
    try:
        task =  db.session.get(Task, task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404
        return task_schema.jsonify(task), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a task"""
    try:
        task = db.session.get(Task, task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """System health check"""
    return jsonify({
        "status": "OK",
        "database": "connected",
        "version": "1.0.0"
    })

# JWT Setup (Preparation for Day 4)
app.config['JWT_SECRET_KEY'] = 'your-jwt-secret'
jwt = JWTManager(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"error": "Invalid credentials"}), 401

# Root route
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Task Management API!"}), 200

# Change the last lines to:
if __name__ == '__main__':
    app.run(debug=True)  