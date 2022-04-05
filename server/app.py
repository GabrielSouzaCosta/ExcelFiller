import json
from flask import Flask, jsonify, redirect, request
from openpyxl import Workbook
import webbrowser
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, current_user


app = Flask(__name__)
app.config.from_object('config')
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+psycopg2://gabrielsc:Sw778083@localhost/excelfiller_db"
jwt = JWTManager(app)

from models import *

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(email=identity).one_or_none()

@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User(email, password)
    add_to_db(user)
    access_token = create_access_token(identity=email)
    print(access_token)

    return user_schema.jsonify(user)

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).one_or_none()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Wrong email or password"}), 401

    access_token = create_access_token(identity=email)  
    return jsonify(access_token=access_token), 200

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    return jsonify(id=current_user.id, email=current_user.email)


@app.route('/tables', methods= ['GET'])
def tables():
    all_tables = Table.query.all()
    results = tables_schema.dump(all_tables) 
    return jsonify(results)


@app.route('/tables/<id>', methods = ['GET'])
def get_table(id):
    table = Table.query.get(id)

    return table_schema.jsonify(table)

@app.route('/tables/<id>/add_column', methods = ['POST'])
def add_column(id):
    table = Table.query.get(id)
    table_id = id
    name = request.json['name']

    column = Column(name, table_id)
    add_to_db(column)

    return column_schema.jsonify(column)


@app.route('/create_table', methods = ['POST'])
def create_table():
    name = request.json['name']
    table = Table(name)
    add_to_db(table)

    return table_schema.jsonify(table)

@app.route('/generate_file', methods = ['POST'])
def generate_file():
    wb = Workbook()
    ws = wb.active
    headers_excel = []
    content = request.json
    # print(content)
    table_headers = content['headers']
    for header in table_headers:
        headers_excel.append(header['name'])
    print(headers_excel)
    table_cells = content['cells']
    ws.append(headers_excel)
    for row in table_cells:
        ws.append(row)
    wb.save('planilha.xlsx')
    print("Arquivo salvo!")
    webbrowser.open("planilha.xlsx")
    return "FIle created"

if __name__ == "__main__":
    app.run(debug=True)