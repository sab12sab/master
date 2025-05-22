from app import create_app, db
from app.models import Contact
app =create_app()
def run():
    print("Seeding database...")
    db.session.query(Contact).delete()
    db.session.commit()
    contact1=Contact(nom="Hamdane" , email="sabrine@gmail.com", description="khoudali&driss")
    db.session.add(contact1)
    db.session.commit()
if __name__ == "__main__":
    with app.app_context():
        run()
    