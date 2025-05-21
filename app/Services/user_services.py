from app import db
from app.models.user import User
class User_services:
    @staticmethod
    def get_user(id_user):
      print(id_user)
      user=User.query.filter_by(id=id_user).first()
      return user