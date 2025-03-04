from models import db
from app import app

def initialize_db():
    with app.app_context():
        db.create_all()
        print("Database initialized")

if __name__ == '__main__':
    initialize_db()