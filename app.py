import pymysql
pymysql.install_as_MySQLdb()
from app import app

if __name__ == "__main__":
    app.run(port=5000)