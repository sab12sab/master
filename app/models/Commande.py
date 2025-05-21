from app import db
from flask_sqlalchemy import SQLAlchemy
from datetime import date

class Commande(db.Model):
    __tablename__='commande'
    id=db.Column(db.Integer,db.Identity(), primary_key=True)
    quantite=db.Column(db.Integer,nullable=False)
    etat_commande=db.Column(db.String(250))
    date = db.Column(db.Date, default=date.today)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    user=db.relationship('User',backref=db.backref('users',lazy=True))
    produit_id=db.Column(db.Integer,db.ForeignKey('products.id'),nullable=False)
    produit=db.relationship('Product',backref=db.backref('products',lazy=True))
    def __repr__(self):
         return f"<Commande {self.id}>"

