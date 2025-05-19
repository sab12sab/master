from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models import User

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signup', methods=['POST'])
def signup():
    try:
        # Get data from the request
        data = request.get_json()
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        email = data.get('email')
        password = data.get('password')

        if not firstname or not lastname or not email or not password:
            return jsonify({"message": "Missing required fields"}), 400

        # Check if the user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"message": "User with this email already exists"}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create a new User
        new_user = User(
            firstname=firstname,
            lastname=lastname,
            email=email,
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully", "user_id": new_user.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


@bp.route('/login', methods=['POST'])
def login():
    try:
        # Get data from the request
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Missing required fields"}), 400

        # Find the user by email
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"message": "User not found"}), 404

        # Check if the password matches
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"message": "Invalid credentials"}), 401



        return jsonify({
            "message": "Login successful",
            "user_id": user.id
        }), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500