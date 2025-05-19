from app.routes.user import bp as user_bp
from app.routes.product import bp as product_bp
from app.routes.category import bp as category_bp

all_blueprints = [user_bp, product_bp, category_bp]