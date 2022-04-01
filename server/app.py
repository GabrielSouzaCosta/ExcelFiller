from flask import Flask, jsonify, request
from openpyxl import Workbook
import webbrowser

app = Flask(__name__)
app.config.from_object('config')
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+psycopg2://gabrielsc:Sw778083@localhost/excelfiller_db"

from models import *

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