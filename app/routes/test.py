from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models import User
bp = Blueprint('teste', __name__, url_prefix='/teste')
@bp.route('/test')
def test():
    return jsonify({"message": "Test route is working!"}), 200