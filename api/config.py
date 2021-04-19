import os
from flask_sqlalchemy import SQLAlchemy
from flask_praetorian import Praetorian
from flask_cors import CORS
from flask_mail import Mail

PASS = os.environ.get("MYSQL_PASS")
SECRET_KEY = os.environ.get("SECRET_KEY") or "secret-key-goes-here"
SERVER_NAME = "192.168.1.155:5000"
databaseURI = f"mysql+mysqldb://root:{PASS}@localhost/opus"
test_databaseURI = f"mysql+mysqldb://root:{PASS}@localhost/test_opus"

db = SQLAlchemy()
guard = Praetorian()
cors = CORS()
mail = Mail()
