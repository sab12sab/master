from app.routes.user import bp as user_bp
from app.routes.product import bp as product_bp
from app.routes.category import bp as category_bp
from app.routes.test import bp as test_bp
from app.routes.commande import op as commande
all_blueprints = [user_bp, product_bp, category_bp, test_bp,commande]