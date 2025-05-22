from app import create_app, db
from app.models import Product, Category

app = create_app()

def run():
    print("Seeding database...")
    db.session.query(Product).delete()
    db.session.query(Category).delete()
    db.session.commit()
    
    # Création des catégories
    category1 = Category(name="Bracelet", image="photos/golden_spark/all (2)/bracelets/bracelet3.jpg")
    category2 = Category(name="Bague", image="photos/golden_spark/all (2)/rings/ring3.jpg")
    category3 = Category(name="Collier", image="photos/golden_spark/all (2)/necklaces/necklace3.jpg")
    category4 = Category(name="Boite", image="/golden_spark/boite/1.jpg")
    category5 = Category(name="Boucles d'oreilles", image="photos/golden_spark/all (2)/earrings/earring3.jpg")
    
    db.session.add_all([category1, category2, category3, category4, category5])
    db.session.commit()
    
    # Produits Bracelet (6 produits)
    bracelet1 = Product(name="Bracelet Élégance", description="Bijou en acier inoxydable parfait pour les occasions formelles et les soirées élégantes.", image="photos/golden_spark/all (2)/bracelets/bracelet1.jpg", price=45.99, stock=25, category_id=category1.id)
    bracelet2 = Product(name="Bracelet Quotidien", description="Bijou en acier inoxydable idéal pour un usage quotidien et le style décontracté.", image="photos/golden_spark/all (2)/bracelets/bracelet2.jpg", price=29.99, stock=40, category_id=category1.id)
    bracelet3 = Product(name="Bracelet Sport", description="Bijou en acier inoxydable conçu pour les activités sportives et les moments actifs.", image="photos/golden_spark/all (2)/bracelets/bracelet3.jpg", price=35.99, stock=30, category_id=category1.id)
    bracelet4 = Product(name="Bracelet Mariage", description="Bijou en acier inoxydable parfait pour les mariages et les cérémonies importantes.", image="photos/golden_spark/all (2)/bracelets/bracelet4.jpg", price=65.99, stock=15, category_id=category1.id)
    bracelet5 = Product(name="Bracelet Travail", description="Bijou en acier inoxydable adapté pour le bureau et les réunions professionnelles.", image="photos/golden_spark/all (2)/bracelets/bracelet5.jpg", price=39.99, stock=35, category_id=category1.id)
   
    # Produits Bague (6 produits)
    bague1 = Product(name="Bague Fiançailles", description="Bijou en acier inoxydable symbolique pour les demandes en mariage et les fiançailles.", image="photos/golden_spark/all (2)/rings/ring1.jpg", price=89.99, stock=12, category_id=category2.id)
    bague2 = Product(name="Bague Anniversaire", description="Bijou en acier inoxydable parfait pour célébrer les anniversaires et les moments précieux.", image="photos/golden_spark/all (2)/rings/ring2.jpg", price=42.99, stock=28, category_id=category2.id)
    bague3 = Product(name="Bague Casual", description="Bijou en acier inoxydable idéal pour le style décontracté et les sorties entre amis.", image="photos/golden_spark/all (2)/rings/ring3.jpg", price=24.99, stock=45, category_id=category2.id)
    bague4 = Product(name="Bague Gala", description="Bijou en acier inoxydable sophistiqué pour les galas et les événements de prestige.", image="photos/golden_spark/all (2)/rings/ring4.jpg", price=75.99, stock=18, category_id=category2.id)
    bague5 = Product(name="Bague Bureau", description="Bijou en acier inoxydable discret adapté pour l'environnement professionnel.", image="photos/golden_spark/all (2)/rings/ring5.jpg", price=32.99, stock=38, category_id=category2.id)
    bague6 = Product(name="Bague Voyage", description="Bijou en acier inoxydable résistant parfait pour les voyages et les aventures.", image="photos/golden_spark/all (2)/rings/rings.jpg", price=37.99, stock=22, category_id=category2.id)
    
    # Produits Collier (6 produits)
    collier1 = Product(name="Collier Cérémonie", description="Bijou en acier inoxydable majestueux pour les cérémonies religieuses et les événements sacrés.", image="photos/golden_spark/all (2)/necklaces/necklace1.jpg", price=68.99, stock=16, category_id=category3.id)
    collier2 = Product(name="Collier Rendez-vous", description="Bijou en acier inoxydable romantique parfait pour les rendez-vous amoureux.", image="photos/golden_spark/all (2)/necklaces/necklace2.jpg", price=52.99, stock=24, category_id=category3.id)
    collier3 = Product(name="Collier Fête", description="Bijou en acier inoxydable festif idéal pour les fêtes et les célébrations joyeuses.", image="photos/golden_spark/all (2)/necklaces/necklace3.jpg", price=41.99, stock=32, category_id=category3.id)
    collier4 = Product(name="Collier Graduation", description="Bijou en acier inoxydable symbolique pour les remises de diplômes et les réussites académiques.", image="photos/golden_spark/all (2)/necklaces/necklace4.jpg", price=58.99, stock=19, category_id=category3.id)
    collier5 = Product(name="Collier Décontracté", description="Bijou en acier inoxydable polyvalent pour les moments détente et les sorties informelles.", image="photos/golden_spark/all (2)/necklaces/necklace5.jpg", price=34.99, stock=41, category_id=category3.id)
    collier6 = Product(name="Collier Cocktail", description="Bijou en acier inoxydable chic pour les cocktails et les réceptions mondaines.", image="photos/golden_spark/all (2)/necklaces/neclaces.jpg", price=62.99, stock=21, category_id=category3.id)
    
    # Produits Boite (1 produit)
    boite2 = Product(name="Boîte Rangement Quotidien", description="Coffret en acier inoxydable pratique pour organiser vos bijoux au quotidien.", image="/golden_spark/boite/1.jpg", price=18.99, stock=60, category_id=category4.id)
    
    # Produits Boucles d'oreilles (5 produits)
    boucle1 = Product(name="Boucles Cérémonie", description="Bijou en acier inoxydable majestueux pour les cérémonies religieuses et les événements sacrés.", image="photos/golden_spark/all (2)/earings/earing1.jpg", price=42.99, stock=20, category_id=category5.id)
    boucle2 = Product(name="Boucles Quotidien", description="Bijou en acier inoxydable discret parfait pour un usage quotidien au bureau.", image="photos/golden_spark/all (2)/earings/earing2.jpg", price=24.99, stock=45, category_id=category5.id)
    boucle3 = Product(name="Boucles Soirée", description="Bijou en acier inoxydable élégant pour les soirées mondaines et les événements chics.", image="photos/golden_spark/all (2)/earings/earing3.jpg", price=56.99, stock=18, category_id=category5.id)
    boucle4 = Product(name="Boucles Sport", description="Bijou en acier inoxydable résistant conçu pour les activités sportives et les moments actifs.", image="photos/golden_spark/all (2)/earings/earing4.jpg", price=32.99, stock=35, category_id=category5.id)
    boucle5 = Product(name="Boucles Mariage", description="Bijou en acier inoxydable raffiné parfait pour les mariages et les cérémonies importantes.", image="photos/golden_spark/all (2)/earings/earing5.jpg", price=68.99, stock=12, category_id=category5.id)
   
    
    # Ajout de tous les produits
    db.session.add_all([
        bracelet1, bracelet2, bracelet3, bracelet4, bracelet5,
        bague1, bague2, bague3, bague4, bague5, bague6,
        collier1, collier2, collier3, collier4, collier5, collier6,
        boite2,
        boucle1, boucle2, boucle3, boucle4, boucle5
    ])
    
    db.session.commit()
    print("Database seeded successfully.")

if __name__ == "__main__":
    with app.app_context():
        run()