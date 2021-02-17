from flask import Flask

# Initialize flask app
app = Flask(__name__, static_folder="../public", static_url_path="/")

from api import api, config  # noqa: E402, F401

app.config["SECRET_KEY"] = config.SECRET_KEY
app.config["SQLALCHEMY_DATABASE_URI"] = config.test_databaseURI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}

# Initialize the flask-praetorian, sqlalchemy and cors instances for the app
from api.config import db, guard, cors  # noqa: E402
from api.userModel import User  # noqa: E402

guard.init_app(app, User)
db.init_app(app)
cors.init_app(app)

with app.app_context():
    db.create_all()
    # Add a user as an example
    if db.session.query(User).filter_by(username="christina").count() < 1:
        db.session.add(
            User(
                username="christina",
                password=guard.hash_password("orzoschnoodle"),
                roles="admin",
            )
        )
    db.session.commit()
