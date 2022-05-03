from email.policy import default
from app import app
from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime
from flask_marshmallow  import Marshmallow
from hmac import compare_digest


db = SQLAlchemy(app)
ma = Marshmallow(app)

def add_to_db(obj):
    db.session.add(obj)
    db.session.commit()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    tables = db.relationship('Table', backref='user', lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password = password

        
    def check_password(self, input_password):
        return compare_digest(input_password, self.password)


class Table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(30), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now())
    columns = db.relationship('Column', cascade='all, delete' , backref='table', lazy=True)

    def __init__(self, name, owner):
        self.name = name
        self.owner = owner

class Column(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    tableId = db.Column(db.Integer, db.ForeignKey('table.id'))
    cells = db.relationship('Cell', cascade='all, delete', backref='column', lazy=True)

    def __init__(self, name, tableId):
        self.name = name
        self.tableId = tableId

class Cell(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, default="")
    column_id = db.Column(db.Integer, db.ForeignKey('column.id'))

    def __init__(self, name, column_id):
        self.name = name
        self.column_id = column_id

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'owner')

class ColumnSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'tableId')

class TableSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Table

    id = ma.auto_field()
    name = ma.auto_field()
    columns = ma.Nested(ColumnSchema, many=True, exclude=['tableId']) 

class CellSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'date_time' , 'currency', 'column_id')

table_schema = TableSchema()
tables_schema = TableSchema(many=True)

column_schema = ColumnSchema()
columns_schema = ColumnSchema(many=True)

user_schema = UserSchema()

cell_schema = CellSchema()
cells_schema = CellSchema(many=True)
