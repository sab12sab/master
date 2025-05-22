from app import db
from flask_sqlalchemy import SQLAlchemy
class Contact(db.Model):
    __tablename__ = 'contact'
    id= db.Column(db.Integer,db.Identity(), primary_key=True)
    nom = db.Column(db.String(length=30), nullable=False)
    email=db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(length=255), nullable=False)
    def __repr__(self):
        return f"<contact {self.nom}>"