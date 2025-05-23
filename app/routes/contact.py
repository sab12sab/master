from app import db 
from app.models.Contact import Contact
from flask import request ,Blueprint,jsonify
op=Blueprint('contact',__name__,url_prefix="/contact")
@op.route("/contact_admin",methods=["POST"])
def cretion_compte():
    try:
        data=request.get_json()
        nom=data.get('nom')
        email=data.get('email')
        description=data.get('description')
        if not email or not nom or not email or not description:
            return jsonify({"message":"erreur"})
        contact=Contact(
            nom=nom,
            email=email,
            description=description
        )
        db.session.add(contact)
        db.session.commit()
        return jsonify({"message": "contact cree"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message":str(e)})