import json
from flask import Flask, jsonify, redirect, request
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object('config')


from models import db
from views import app


migrate = Migrate(app, db)
