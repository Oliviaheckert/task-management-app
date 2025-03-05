from flask_marshmallow import Marshmallow
from models import Task, User

ma = Marshmallow()

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        include_fk = True
        load_instance = True

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)
user_schema = UserSchema()
users_schema = UserSchema(many=True)
