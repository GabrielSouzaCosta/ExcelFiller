from werkzeug.security import generate_password_hash, check_password_hash
from app import app
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow  import Marshmallow

db = SQLAlchemy(app)
ma = Marshmallow(app)

def add_to_db(obj):
    db.session.add(obj)
    db.session.commit()

class User(db.Model):
    __table_args__ = (db.UniqueConstraint("google_id"), db.UniqueConstraint("email"))

    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String, nullable=True)

    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    tables = db.relationship('Table', backref='user', lazy=True)

    def __init__(self, email):
        self.email = email

    @property
    def password(self):
        raise AttributeError("Can't read password")

    @password.setter
    def password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # def check_password(self, input_password):
    #     return compare_digest(input_password, self.password)

class Table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(30), unique=True, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    columns = db.relationship('Column', backref='table', lazy=True)

    def __init__(self, name):
        self.name = name

class Column(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    tableId = db.Column(db.Integer, db.ForeignKey('table.id'), nullable=False)

    def __init__(self, name, tableId):
        self.name = name
        self.tableId = tableId


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email')

class ColumnSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'tableId')

class TableSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Table

    id = ma.auto_field()
    name = ma.auto_field()
    columns = ma.Nested(ColumnSchema, many=True, exclude=['tableId']) 

table_schema = TableSchema()
tables_schema = TableSchema(many=True)

column_schema = ColumnSchema()
columns_schema = ColumnSchema(many=True)

user_schema = UserSchema()