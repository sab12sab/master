from flask_sqlalchemy import SQLAlchemy
from app import db
class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, db.Identity(),primary_key=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    image = db.Column(db.String(255), nullable=False)
    isDeleted = db.Column(db.Boolean, nullable=False, default=False)
    def __repr__(self):
        return f"<Category {self.name}>"