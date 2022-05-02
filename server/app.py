import json
from flask import Flask, jsonify, redirect, request
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object('config')


from models import db
from views import app

migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True)