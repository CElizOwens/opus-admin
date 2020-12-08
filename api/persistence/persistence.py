from api.models.model import Piece, Event, Venue, Performance, Program  # , Ensemble
from api.config import databaseURI, test_databaseURI
from sqlalchemy import create_engine, text


# engine = create_engine(databaseURI, echo=True)
engine = create_engine(test_databaseURI, echo=True)


def get_all_pieces():
    with engine.connect() as con:
        # result = con.execute("SELECT c.name, p.title, p.opus, e.ens_type FROM piece p INNER JOIN ensemble e ON p.ensemble_id = e.id INNER JOIN composer c ON p.composer_id = c.id;")

        #     result = con.execute("SELECT c.name, p.title FROM piece p INNER JOIN composer c ON p.composer_id = c.id;")
        #     pieces = []
        #     for row in result:
        #         pieces.append(Piece(**row))
        # return pieces

        res = con.execute(
            "SELECT c.name, p.title FROM performance pf INNER JOIN piece p ON pf.piece_id = p.id INNER JOIN composer c ON p.composer_id = c.id;")

        repertoire = []
        for row in res:
            repertoire.append(Piece(**row))
    return repertoire


def get_all_composer_names():
    with engine.connect() as con:
        result = con.execute("SELECT * FROM composer;")
        names = []
        for row in result:
            names.append(row.name)
    return names


def get_all_venues():
    with engine.connect() as con:
        result = con.execute("SELECT * FROM venue;")
        venues = []
        for row in result:
            venues.append(Venue(**row))
    return venues


# returns a program namedtuple
def get_program(event):
    performances = get_event_performances(event.id)
    program = Program(event, performances)
    return program


# returns a list of performance namedtuples from a single event
def get_event_performances(event_id):
    with engine.connect() as con:
        result = con.execute(text(
            "SELECT c.name, p.title, pf.notes FROM performance pf  INNER JOIN piece p ON pf.piece_id = p.id INNER JOIN composer c ON p.composer_id = c.id WHERE pf.event_id = :event_id;"), event_id=event_id)
        performances = []
        for row in result:
            performances.append(Performance(**row))
    return performances


# returns a list of all performance namedtuples
def get_all_performances():
    with engine.connect() as con:
        result = con.execute(
            "SELECT c.name, p.title, pf.notes FROM performance pf INNER JOIN piece p ON pf.piece_id = p.id INNER JOIN composer c ON p.composer_id = c.id;")
        performances = []
        for row in result:
            performances.append(Performance(**row))
    return performances


def insert_piece(name, title):  # TO BE EDITED
    with engine.connect() as con:
        # con.execute(text("INSERT INTO piece (composer, title, opus, ensemble_id) VALUES (:composer, :title, :opus, :ensemble_id);"), composer=composer, title=title, opus=opus, ensemble_id=ensemble_id)
        con.execute(text(
            "INSERT INTO piece (name, title) VALUES (:name, :title);"), name=name, title=title)


def insert_venue(name, address, link):
    with engine.connect() as con:
        con.execute(text("INSERT IGNORE INTO venue (name, address, link) VALUES (:name, :address, :link);"),
                    name=name, address=address, link=link)


def insert_event(location, day_time):  # TO BE EDITED
    with engine.connect() as con:
        con.execute(text("INSERT INTO event (location, day_time) VALUES (:location, :day_time);"),
                    location=location, day_time=day_time)


def insert_performance(event_id, name, title, notes):
    with engine.connect() as con:
        result = con.execute(text(
            "SELECT p.id FROM piece p INNER JOIN composer c ON p.composer_id = c.id WHERE c.name = :name AND p.title = :title;"), name=name, title=title)
        row = result.fetchone()
        piece_id = row.id
        con.execute(text("INSERT INTO performance (event_id, piece_id, notes) VALUES (:event_id, :piece_id, :notes);"),
                    event_id=event_id, piece_id=piece_id, notes=notes)


# returns an event namedtuple
def get_event(event_id):
    with engine.connect() as con:
        result = con.execute(text(
            "SELECT e.id, v.name, e.day_time FROM event e INNER JOIN venue v ON e.venue_id = v.id WHERE e.id = :event_id;"), event_id=event_id)
        row = result.fetchone()
        event = Event(**row)
    return event


# returns a list of of all event namedtuples
def get_all_events():
    with engine.connect() as con:
        result = con.execute(
            "SELECT e.id, v.name, e.day_time FROM event e INNER JOIN venue v ON e.venue_id = v.id;")
        events = []
        for row in result:
            events.append(Event(**row))
    return events


# def get_all_ensembles():
#     with engine.connect() as con:
#         result = con.execute("SELECT * FROM ensemble;")
#         ensembles = []
#         for row in result:
#             ensembles.append(Ensemble(**row))
#     return ensembles
