from flask import Blueprint, request, jsonify
from app import db
from app.models.product import Category
bp = Blueprint('category', __name__, url_prefix='/category')

@bp.route('/', methods=['POST'])
def add_category():
    try:
        # Get data from the request
        data = request.get_json()
        name = data.get('name')
        image = data.get('image')

        if not name or not image:
            return jsonify({"message": "Missing required fields"}), 400

        # Check if the category already exists
        existing_category = Category.query.filter_by(name=name).first()
        if existing_category:
            return jsonify({"message": "Category with this name already exists"}), 400

        new_category = Category(
            name=name,
            image=image
        )

        db.session.add(new_category)
        db.session.commit()

        return jsonify({"message": "Category added successfully", "category": new_category.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Delete Category
@bp.route('/<int:id>', methods=['DELETE'])
def delete_category(id):
    try:
        category = Category.query.get(id)

        if not category:
            return jsonify({"message": "Category not found"}), 404

        category.isDeleted = True  # Soft delete
        db.session.commit()

        return jsonify({"message": "Category marked as deleted"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Update Category
@bp.route('/<int:id>', methods=['PUT'])
def update_category(id):
    try:
        # Get data from the request
        data = request.get_json()

        # Find the category by id
        category = Category.query.get(id)

        if not category:
            return jsonify({"message": "Category not found"}), 404

        # Update the category attributes
        category.name = data.get('name', category.name)
        category.image = data.get('image', category.image)

        # Commit changes to the database
        db.session.commit()

        return jsonify({"message": "Category updated successfully", "category": category.id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Get All Categories
@bp.route('/', methods=['GET'])
def get_all_categories():
    try:
        categories = Category.query.filter_by(isDeleted=False).all()

        if not categories:
            return jsonify({"message": "No categories found"}), 404

        category_list = [{
            "id": category.id,
            "name": category.name,
            "image": category.image
        } for category in categories]

        return jsonify({"categories": category_list}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500
