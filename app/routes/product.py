from flask import Blueprint, request, jsonify
from app import db
from app.models.product import Product
from app.Services.user_services import User_services
from app.Services.produit_services import Services_produit

bp = Blueprint('product', __name__, url_prefix='/products')

@bp.route("/", methods=["GET"])
def get_all_products():
    try:
        products = Product.query.all()  # Get all products from the database
        
        # Format the product data as a list of dictionaries
        product_list = [
            {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'image': product.image,
                'price': product.price,
                'stock': product.stock,
                'category':product.category_id
            }
            for product in products
         
        ]
        
        return jsonify(product_list), 200  

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route("/", methods=["POST"])
def add_product():
    try:
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        image = data.get('image')
        price = data.get('price')
        stock = data.get('stock', 0) 
        category_id = data.get('category_id')

        if not name or not description or not image or not price or not category_id:
            return jsonify({"message": "Missing required fields"}), 400
        
        new_product = Product(
            name=name,
            description=description,
            image=image,
            price=price,
            stock=stock,
            category_id=category_id
        )

        db.session.add(new_product)
        db.session.commit()
        return jsonify({"message": "Product added successfully", "product": new_product.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        product = Product.query.get(id)

        if not product:
            return jsonify({"message": "Product not found"}), 404

        db.session.delete(product)
        db.session.commit()

        return jsonify({"message": "Product deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


@bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        # Get data from the request
        data = request.get_json()

        # Find the product by id
        product = Product.query.get(id)

        if not product:
            return jsonify({"message": "Product not found"}), 404

        # Update the product attributes
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.image = data.get('image', product.image)
        product.price = data.get('price', product.price)
        product.stock = data.get('stock', product.stock)
        product.category_id = data.get('category_id', product.category_id)

        # Commit changes to the database
        db.session.commit()

        return jsonify({"message": "Product updated successfully", "product": product.id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


@bp.route('/category/<int:category_id>', methods=['GET'])
def get_products_by_category(category_id):
    try:
        print(category_id)
        products = Product.query.filter_by(category_id=category_id).all()

        if not products:
            return jsonify({"message": "No products found in this category"}), 404

        product_list = [{
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "price": product.price,
            "stock": product.stock,
            "category_id": product.category_id
        } for product in products]

        return jsonify({"products": product_list}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500
@bp.route("/Update_quantite",methods=["POST"])
def Update_produit():
  try:
    data=request.get_json()
    id_produit=data.get('id_produit')
    id_user=data.get('id_user')
    quantite=data.get('quantite')
    if not id_produit or not id_user or not quantite :
        return jsonify({"message":"invlaide request"}),400
    user=User_services.get_user(id_user)
    if not user.isAdmin:
         return jsonify({"message":"no Admin"}),200
    etat=Services_produit.modifie_quantite(id_produit,quantite)
    if not etat:
        return jsonify({"message":"probleme  leur de modification"}),200
    return jsonify({"message":"la modification est valide merci"})
  except Exception as e:
      return jsonify({"message":str(e)})
    
@bp.route('/getproduit_by_id/<int:produit_id>',methods=["GET"])
def get_produit_by_id(produit_id):
    try:
        produit=Product.query.filter_by(id=produit_id).first()
        if not produit :
         return jsonify({"message":"invlaide request"}),400
        produit_return=[
            {
                "id":produit.id,
                "name":produit.name,
                "description":produit.description,
                "image":produit.image,
                "price":produit.price,
                "stock":produit.stock
            }
        ]
        return jsonify({"products": produit_return}), 200
    except Exception as e:
      return jsonify({"message":str(e)})



