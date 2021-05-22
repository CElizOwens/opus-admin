# flake8: noqa=E501
from flask import Flask

# Initialize flask app
app = Flask(__name__, static_folder="../public", static_url_path="/")

# MUST import - os; api, config from api - HERE after Flask() instantiation
import os  # noqa: E402
from api import api, config  # noqa: E402, F401

app.config["SECRET_KEY"] = config.SECRET_KEY
app.config["SQLALCHEMY_DATABASE_URI"] = config.test_databaseURI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_ACCESS_LIFESPAN"] = {"minutes": 15}
app.config["JWT_REFRESH_LIFESPAN"] = {"hours": 24}
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = os.environ.get("EMAIL_USER")
app.config["MAIL_PASSWORD"] = os.environ.get("EMAIL_APP_PASS")
app.config["PRAETORIAN_CONFIRMATION_SENDER"] = os.environ.get("EMAIL_USER")
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
app.config["SERVER_NAME"] = config.SERVER_NAME + ":5000"

# Initialize the flask-praetorian, sqlalchemy and cors instances for the app
# MUST import - db, guard, cors, mail; User - HERE after app configuration
from api.config import db, guard, cors, mail  # noqa: E402
from api.userModel import User  # noqa: E402

guard.init_app(app, User)
db.init_app(app)
cors.init_app(app)
mail.init_app(app)

with app.app_context():
    db.create_all()
    # Add a user as an example
    if (
        db.session.query(User).filter_by(username="owens.christina@gmail.com").count()
        < 1
    ):
        db.session.add(
            User(
                username="owens.christina@gmail.com",
                hashed_password=guard.hash_password("gooberville"),
                roles="admin",
                is_active=True,
            )
        )
    db.session.commit()
