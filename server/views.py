from crypt import methods
from datetime import datetime, timezone, timedelta
from flask import Flask, jsonify, redirect, request
from app import app
from openpyxl import Workbook
import webbrowser
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, current_user, get_jwt, set_access_cookies
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

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

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

@app.route('/create_table', methods = ['POST'])
@jwt_required()
def create_table():
    name = request.json.get("name")
    user = User.query.filter_by(email=get_jwt_identity()).one_or_none()
    table = Table(name, owner=user.id)
    add_to_db(table)

    return table_schema.jsonify(table)


@app.route('/tables', methods= ['GET'])
@jwt_required()
def tables():
    user = User.query.filter_by(email=get_jwt_identity()).one_or_none()
    all_tables = Table.query.filter_by(owner=user.id)
    results = tables_schema.dump(all_tables) 
    return jsonify(results)


@app.route('/tables/<id>', methods = ['GET'])
def get_table(id):
    table = Table.query.get(id)

    return table_schema.jsonify(table)


@app.route('/delete_table', methods = ['DELETE'])
def delete_table():
    id = request.json.get('id')
    table = Table.query.filter_by(id=id).first()
    db.session.delete(table)
    db.session.commit()

    return f"{id} table deleted."

@app.route('/tables/<id>/add_column', methods = ['POST'])
def add_column(id=4):
    table_id = id
    name = request.json.get('name')
    column = Column(name, table_id)
    add_to_db(column)

    return column_schema.jsonify(column), 200

@app.route('/tables/<id>/update_column', methods = ['PUT', 'POST'])
def update_column(id):
    table_id = id
    data = request.json.get('data')
    print(data)
    col_id = data['id']
    new_name = data['new_name']
    print(table_id, col_id, new_name)
    col = Column.query.filter_by(id=col_id, tableId=table_id).one_or_none()
    col.name = new_name         
    db.session.commit()

    return column_schema.jsonify(col), 200

@app.route('/tables/<id>/delete_column', methods = ['DELETE'])
def delete_column(id):
    table_id = id
    column_id = request.json.get('column_id')
    Column.query.filter_by(tableId=table_id, id=column_id).delete()
    db.session.commit()

    return f"{column_id} deleted from table.", 200


@app.route('/add_item', methods = ['POST'])
def add_item():
    column_id = request.json.get('column_id')
    name = request.json.get('name')
    item = Cell(name=name, column_id=column_id)
    add_to_db(item)

    return cell_schema.jsonify(item), 200

@app.route('/delete_item', methods = ['DELETE'])
def delete_item():
    print(request.json)
    column_id = request.json.get('column_id')
    name = request.json.get('name')
    item = Cell.query.filter_by(name=name, column_id=column_id).first()
    db.session.delete(item)
    db.session.commit()

    return cell_schema.jsonify(item), 200


@app.route('/items/<id>', methods = ['GET'])
def get_items(id):
    column_id = id
    cells = Cell.query.filter_by(column_id=column_id)
    results = cells_schema.dump(cells)

    return jsonify(results), 200


@app.route('/generate_file', methods = ['POST'])
def generate_file():
    wb = Workbook()
    ws = wb.active
    headers_excel = []
    content = request.json.get("data")
    print(content)
    table_headers = content['headers']
    for header in table_headers:
        headers_excel.append(header)
    print(headers_excel)
    table_cells = content['cells']
    ws.append(headers_excel)
    for row in table_cells:
        ws.append(row)
    wb.save('planilha.xlsx')
    print("Arquivo salvo!")
    webbrowser.open("planilha.xlsx")
    return "FIle created"