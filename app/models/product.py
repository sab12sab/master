from app import db
from flask_sqlalchemy import SQLAlchemy

class Product(db.Model):
    __tablename__ = 'products'
    id= db.Column(db.Integer,db.Identity(), primary_key=True,)
    name = db.Column(db.String(length=30), nullable=False)
    description = db.Column(db.String(length=255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    category=db.relationship('Category',backref=db.backref('products',lazy=True,cascade='all,delete-orphan'))

    def __repr__(self):
        return f"<products {self.name} - ${self.price}>"



