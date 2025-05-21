from app import create_app, db
from app.models import Product,Category

app = create_app()
def run():
    print("Seeding database...")
    db.session.query(Product).delete()
    db.session.query(Category).delete()
    db.session.commit()
    category1 = Category(name="Electronics", image="https://example.com/electronics.jpg")
    category2 = Category(name="Clothing", image="https://example.com/clothing.jpg")
    category3 = Category(name="Books", image="https://example.com/books.jpg")
    category4 = Category(name="Toys", image="https://example.com/toys.jpg")
    category5 = Category(name="Sports", image="https://example.com/sports.jpg")
    db.session.add_all([category1, category2, category3, category4, category5])
    db.session.commit()
    Produit1 = Product(name="Laptop", description="A high-performance laptop.", image="https://example.com/laptop.jpg", price=999.99, stock=10, category_id=category1.id)
    Produit2 = Product(name="Smartphone", description="A latest model smartphone.", image="https://example.com/smartphone.jpg", price=699.99, stock=20, category_id=category1.id)
    Produit3 = Product(name="T-shirt", description="A comfortable cotton t-shirt.", image="https://example.com/tshirt.jpg", price=19.99, stock=50, category_id=category2.id)
    Produit4 = Product(name="Jeans", description="Stylish denim jeans.", image="https://example.com/jeans.jpg", price=49.99, stock=30, category_id=category2.id)
    Produit5 = Product(name="Novel", description="A captivating novel.", image="https://example.com/novel.jpg", price=14.99, stock=100, category_id=category3.id)
    Produit6 = Product(name="Textbook", description="A comprehensive textbook.", image="https://example.com/textbook.jpg", price=59.99, stock=15, category_id=category3.id)
    Produit7 = Product(name="Action Figure", description="A collectible action figure.", image="https://example.com/actionfigure.jpg", price=24.99, stock=40, category_id=category4.id)
    Produit8 = Product(name="Puzzle", description="A challenging jigsaw puzzle.", image="https://example.com/puzzle.jpg", price=9.99, stock=25, category_id=category4.id)
    Produit9 = Product(name="Soccer Ball", description="A high-quality soccer ball.", image="https://example.com/soccerball.jpg", price=29.99, stock=60, category_id=category5.id)
    Produit10 = Product(name="Tennis Racket", description="A professional tennis racket.", image="https://example.com/tennisracket.jpg", price=89.99, stock=5, category_id=category5.id)
    db.session.add_all([Produit1, Produit2, Produit3, Produit4, Produit5, Produit6, Produit7, Produit8, Produit9, Produit10])
    db.session.commit()
    print("Database seeded successfully.")
if __name__ == "__main__":
    with app.app_context():
        run()