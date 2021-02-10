# from .main import main as main_blueprint
# from .auth import auth as auth_blueprint

from flask import Flask

app = Flask(__name__, static_folder="../public", static_url_path="/")

from api import api, config  # noqa: E402, F401
# from api.api import auth

app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = config.test_databaseURI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from api.config import db  # noqa: E402
db.init_app(app)
with app.app_context():
    db.create_all()

# blueprint for auth routes in our app
# app.register_blueprint(auth)

# blueprint for non-auth parts of app
# app.register_blueprint(main_blueprint)
