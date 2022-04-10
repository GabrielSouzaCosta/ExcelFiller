from flask import Flask, jsonify, redirect, request
from app import app
from openpyxl import Workbook
import webbrowser
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, current_user
from models import *

jwt = JWTManager(app)

msg = ""

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
    user_exists = User.query.filter_by(email=email).one_or_none()
    if user_exists:
        print(user_exists)
        msg = "The user already exists"
        return {"msg": msg}, 401

    if len(password) < 8:
        msg = "The password must have at least 8 characters"
        return {"msg": msg}, 401

    user = User(email, password)
    add_to_db(user)
    access_token = create_access_token(identity=email)
    print(access_token)

    return user_schema.jsonify(user), 200

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).one_or_none()
    if not user or not user.check_password(password):
        msg = "Wrong email or password"
        return {"msg": msg}, 401

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

@app.route('/create_table', methods = ['POST'])
def create_table():
    name = request.json['name']
    table = Table(name)
    add_to_db(table)

    return table_schema.jsonify(table)

@app.route('/delete_table', methods = ['DELETE'])
def delete_table():
    name = request.json['name']
    Table.query.filter_by(name=name).delete()
    db.session.commit()

    return f"{name} table deleted."

@app.route('/tables/<id>/add_column', methods = ['POST'])
def add_column(id):
    table = Table.query.get(id)
    table_id = id
    name = request.json['name']

    column = Column(name, table_id)
    add_to_db(column)

    return column_schema.jsonify(column)

@app.route('/tables/<id>/delete_column', methods = ['DELETE'])
def delete_column(id):
    table_id = id
    name = request.json['name']

    Column.query.filter_by(name=name, tableId=table_id).delete()
    db.session.commit()

    return f"{name} deleted from table."

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