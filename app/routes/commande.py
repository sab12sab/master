from flask import Blueprint,request,jsonify
from app import db
from app.models.Commande import Commande
from app.Services.produit_services import Services_produit
op=Blueprint('commande',__name__,url_prefix='/commande')
@op.route("/get_commande", methods=["GET"])
def get_commaande():
    try:
        commandes = Commande.query.all()
        liste_commandes = []
        for cmd in commandes:
            total = cmd.quantite * cmd.produit.price  
            commande_data = {
                "commande_id": cmd.id,
                "quantite": cmd.quantite,
                "etat_commande": cmd.etat_commande,
                "total": total,
                "user": {
                    "id": cmd.user.id,
                    "nom": cmd.user.firstname,
                    "email": cmd.user.email
                },
                "produit": {
                    "id": cmd.produit.id,
                    "nom": cmd.produit.name,
                    "price": cmd.produit.price
                }
            }
            liste_commandes.append(commande_data)
        return jsonify(liste_commandes), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@op.route("/creation_commande",methods=["POST"])
def creation_commande(): 
    try:
        data=request.get_json()
        quantite=data.get('quantite')
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

@op.route("/update_etat_commande/<int:id>", methods=["POST"])
def update_etat_commande(id):
        try:
            data = request.get_json()
            new_etat = data.get('etat_commande')
            commande = Commande.query.get(id)
            if not commande:
                return jsonify({"message": "Commande non trouvée"}), 404
            commande.etat_commande = new_etat
            db.session.commit()
            return jsonify({"message": "État de la commande mis à jour"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": str(e)}), 500
