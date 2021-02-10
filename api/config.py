import os
from flask_sqlalchemy import SQLAlchemy

PASS = os.environ.get('MYSQL_PASS')
SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key-goes-here'
databaseURI = f'mysql+mysqldb://root:{PASS}@localhost/opus'
test_databaseURI = f'mysql+mysqldb://root:{PASS}@localhost/test_opus'

db = SQLAlchemy()
