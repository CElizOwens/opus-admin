import os

PASS = os.environ.get('MYSQL_PASS')

databaseURI = f'mysql+mysqldb://root:{PASS}@localhost/opus'
test_databaseURI = f'mysql+mysqldb://root:{PASS}@localhost/test_opus'
