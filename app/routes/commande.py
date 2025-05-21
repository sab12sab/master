from flask import Blueprint,request,jsonify
from app import db
from app.models.Commande import Commande
from app.Services.produit_services import Services_produit
op=Blueprint('commande',__name__,url_prefix='/commande')
@op.route("/creation_commande",methods=["POST"])
def creation_commande(): 
    try:
        data=request.get_json()
        quantite=data.json['quantite']
        etat_commande=data.get('etat_commande')
        user_id=data.get('user_id')
        produit_id=data.get('produit_id')
        etat=Services_produit.verifie_quanitei_produit(produit_id,quantite)
        print(etat)
        if not etat:
            return jsonify({"message":"le quantite demande n'est pas disponible"}),400
        new_commande=Commande(
            quantite=quantite,
            etat_commande=etat_commande,
            user_id=user_id,
            produit_id=produit_id
        )
        db.session.add(new_commande)
        db.session.commit()
        return jsonify({"message": "commande cree"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message":str(e)})

    
