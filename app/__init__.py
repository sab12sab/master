import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:root@localhost/golden_spark'

db = SQLAlchemy(app)
bcrypt = Bcrypt()
bcrypt.init_app(app)

from app.models import *
with app.app_context():
    db.create_all()

from app.routes import all_blueprints
for bp in all_blueprints:
    app.register_blueprint(bp)