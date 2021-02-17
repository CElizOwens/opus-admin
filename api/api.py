# flake8: noqa=E501
from api import app
from api.config import db, guard
from api.persistence import persistence
from flask import abort, redirect, request, url_for  # , g
import flask_praetorian

# from flask_httpauth import HTTPBasicAuth
from api.userModel import User

from dateutil.parser import parse
import json
import time


# auth = HTTPBasicAuth()


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


# EXAMPLE
@app.route("/api/")
def home():
    return {"Hello": "World"}, 200


@app.route("/api/login", methods=["POST"])
def login():
    """
    Logs a user in by parsing a POST request containing
    user credentials and issuing a JWT token.
    .. example::
        $ curl http://localhost:5000/api/login -X POST \
            -d '{"username":"christina", "password":"orzoschnoodle"}'
    """
    req = request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    user = guard.authenticate(username, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return ret, 200


@app.route("/api/refresh", methods=["POST"])
def refresh():
    """
    Refreshes an existing JWT by creating a new one
    that is a copy of the old except it has
    a refreshed access expiration.
    .. example::
        $ curl http://localhost:5000/api/refresh -X GET \
            -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {"access_token": new_token}
    return ret, 200


@app.route("/api/protected")
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator
    will require a header containing a valid JWT
    .. example::
        $ curl http://localhost:5000/api/protected -X GET \
            -H "Authorization: Bearer <your_token>"
    """
    return {
        "message": f"protected endpoint (allowed user {flask_praetorian.current_user().username})"
    }


# @app.route("/api/resource")
# @auth.login_required
# def get_resource():
#     return {"data": "Hello, %s!" % g.user.username}


# @auth.verify_password
# def verify_password(username_or_token, password):
#     # first try to authenticate by token
#     user = User.verify_auth_token(username_or_token)
#     if not user:
#         # try to athenticate with username/password
#         user = User.query.filter_by(username=username_or_token).first()
#         if not user or not user.verify_password(password):
#             return False
#     g.user = user
#     return True


@app.route("/api/users", methods=["POST"])
def new_user():
    username = request.json.get("username")
    password = request.json.get("password")
    if username is None or password is None:
        abort(400)  # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)  # existing user
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return (
        {"username": user.username},
        201,
        {"Location": url_for("get_user", id=user.id, _external=True)},
    )


@app.route("/api/users/<int:id>")
def get_user(id):
    user = User.query.get(id)
    if not user:
        abort(400)
    return {"username": user.username}


# @app.route("/api/token")
# @auth.login_required
# def get_auth_token():
#     token = g.user.generate_auth_token(600)
#     return {"token": token.decode("ascii"), "duration": 600}


@app.route("/api/time")
def get_current_time():
    return {"time": time.strftime("%X %x")}


@app.route("/api/venues", methods=["GET", "POST"])
def get_venues():
    if request.method == "POST":
        req = json.loads(request.data)["data"]
        # print(f'req["name"] = {req["name"]}')
        # print(f'******* req = {req[data]} *******\n Type = {type(req)}')
        name = req["name"]
        address = req["address"]
        link = req["link"]
        persistence.insert_venue(name, address, link)
    return to_json(persistence.get_all_venues())


@app.route("/api/repertoire")
def get_repertoire():
    return to_json(persistence.get_all_performances())


@app.route("/api/programs", methods=["GET", "POST"])
def get_programs():
    if request.method == "POST":
        req = json.loads(request.data)["data"]
        print(f"******* req = {req} *******\n Type = {type(req)}")
        persistence.insert_event(parse(req["day_time"]), req["venue_id"])
        redirect("/api/programs")
    # get list of Event namedtuples
    events = persistence.get_all_events()
    programs = []
    for event in events:
        # get list of Performance namedtuples
        performances_nts = persistence.get_event_performances(event.id)
        # convert to list of OrderedDicts
        performances_dicts = [nt._asdict() for nt in performances_nts]
        # print(
        #     f"**** event date -------> {event.day_time.strftime('%X %x')}")
        date_string = event.day_time.strftime("%x %X")
        event_dicts = event._asdict()
        # print(f"*** event as dict -------> {event_dicts}")
        # print(f"*** event dict day_time -------> {event_dicts['day_time']}")
        event_dicts["day_time"] = date_string
        programs.append({"event": event_dicts, "performances": performances_dicts})
    programs_json = json.dumps(programs)
    return programs_json


@app.route("/api/performances/<event_id>", methods=["POST"])
def add_performance(event_id):
    if request.method == "POST":
        req = json.loads(request.data)["data"]
        print(
            f"******* req = {req}\n******* Event ID: {event_id}\n"
            + f"******* Type of req = {type(req)}"
        )
        persistence.insert_performance(
            event_id, req["composer"], req["imslp_title"], req["performance_notes"]
        )
    return "Success"


@app.route("/api/composers")
def get_composers():
    composers_nts = persistence.get_all_composers()
    composers_dicts = [nt._asdict() for nt in composers_nts]
    composers_json = json.dumps(composers_dicts)
    return composers_json


@app.route("/api/composer_pieces/<name>")
def get_pieces_by_composer(name):
    composer_rep_nts = persistence.get_composer_rep(name)
    composer_rep_dicts = [nt._asdict() for nt in composer_rep_nts]
    composer_rep_json = json.dumps(composer_rep_dicts)
    return composer_rep_json


def to_json(nts):
    dicts = [nt._asdict() for nt in nts]
    return json.dumps(dicts)
