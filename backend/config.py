import os
from flask_sqlalchemy import SQLAlchemy
from flask_praetorian import Praetorian
from flask_cors import CORS, cross_origin
from flask_mail import Mail

PASS = os.environ.get("MYSQL_PASS")
SECRET_KEY = os.environ.get("SECRET_KEY") or "secret-key-goes-here"
SERVER_NAME = "10.0.0.40"
# SERVER_NAME = "localhost.localdomain:5000"
databaseURI = f"mysql+mysqldb://root:{PASS}@localhost/opus"
test_databaseURI = f"mysql+mysqldb://root:{PASS}@localhost/test_opus"

db = SQLAlchemy()
guard = Praetorian()
cors = CORS()
mail = Mail()
cross_origin = cross_origin
