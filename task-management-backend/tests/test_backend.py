import pytest
from app import app, db
from models import Task, User

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'connect_args': {'check_same_thread': False}
    }
    
    with app.app_context():
        # Add SQLAlchemy event listener for foreign keys
        from sqlalchemy import event
        from sqlalchemy.engine import Engine
        
        @event.listens_for(Engine, "connect")
        def set_sqlite_pragma(dbapi_connection, connection_record):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()

        db.create_all()
        yield app.test_client()
        db.drop_all()

def test_missing_required_fields(client):
    """Test missing title and user_id"""
    # Missing title
    response = client.post('/api/tasks', json={
        'user_id': 1,
        'description': 'No title'
    })
    assert response.status_code == 400

    # Missing user_id
    response = client.post('/api/tasks', json={
        'title': 'No user',
    })
    assert response.status_code == 400

def test_invalid_status(client):
    """Test invalid status choice"""
    with client.application.app_context():
        # Create & commit user
        user = User(username='test', password='test')
        db.session.add(user)
        db.session.commit()
        user_id = user.id # Get ID while session is active
    
    # Use the stored user_id
    response = client.post('/api/tasks', json={
        'title': 'Invalid Status',
        'user_id': user.id, # Use the captures ID
        'status': 'invalid_status'
    })
    assert response.status_code == 400
    assert 'Valid choices' in response.json['error']

def test_update_validation(client):
    """Test invalid update attempts"""
    # Create initial task
    with client.application.app_context():
        user = User(username='test', password='test')
        db.session.add(user)
        db.session.commit()
        task = Task(title='Test', user_id=user.id)
        db.session.add(task)
        db.session.commit()
        task_id = task.id

    # Invalid status update
    response = client.put(f'/api/tasks/{task_id}', json={
        'status': 'invalid_status'
    })
    assert response.status_code == 400

    # Empty title update
    response = client.put(f'/api/tasks/{task_id}', json={
        'title': ''
    })
    assert response.status_code == 400


def test_nonexistent_user(client):
    """Test task creation with invalid user_id"""
    response = client.post('/api/tasks', json={
        'title': 'Bad User',
        'user_id': 999,  # Non-existent user
        'description': 'Should fail',
        'status': 'pending'
    })
    assert response.status_code == 400
    assert 'Invalid user_id' in response.json['error']

def test_full_crud_flow(client):
    # Create test user first
    with client.application.app_context():
        from models import User
        test_user = User(username='testuser', password='testpass')
        db.session.add(test_user)
        db.session.commit()
        user_id = test_user.id

    # Create task with valid user_id
    create_res = client.post('/api/tasks', json={
        'title': 'Test Task',
        'description': 'Test Description',
        'status': 'pending',
        'user_id': user_id  # Required foreign key
    })
    assert create_res.status_code == 201
    task_id = create_res.json['id']