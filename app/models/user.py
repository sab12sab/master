from app import db
from flask_sqlalchemy import SQLAlchemy

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, db.Identity(), primary_key=True)
    firstname = db.Column(db.String(length=30), nullable=False)
    lastname = db.Column(db.String(length=30), nullable=False)
    email = db.Column(db.String(length=30), nullable=False, unique=True)
    password = db.Column(db.String(length=255), nullable=False, unique=True)
    isAdmin = db.Column(db.Boolean, nullable=False, default=False)
    def __repr__(self):
     return f"<User {self.name} - ${self.price}>"