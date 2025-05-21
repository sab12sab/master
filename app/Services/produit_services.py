from app.models.product import Product
from app import db
from app.Services.user_services import User_services
class Services_produit:
    @staticmethod
    def verifie_quanitei_produit(produit_id,quantite):
        produit=Product.query.filter_by(id=produit_id).first()
        if produit.stock<quantite:
            return False
        produit.stock = produit.stock - quantite
        db.session.commit()
        return True
    @staticmethod
    def modifie_quantite(produit_id,quantite):
         produit=Product.query.filter_by(id=produit_id).first()
         if not produit :
          return False
         if produit.stock==0:
              produit.stock=quantite
              db.session.commit()
              return True
         produit.stock=produit.stock+quantite
         db.session.commit()
         return True
         
        
     
