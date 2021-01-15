from api.models.model import Composer, Composer_rep, Piece, Event, Venue, Performance, Program  # , Ensemble
from api.config import databaseURI, test_databaseURI
from sqlalchemy import create_engine, text


# engine = create_engine(databaseURI, echo=True)
engine = create_engine(test_databaseURI, echo=True)


def get_all_pieces():
    with engine.connect() as con:
        result = con.execute(
            "SELECT c.name, p.title FROM performance pf INNER JOIN piece p ON pf.piece_id = p.id INNER JOIN composer c ON p.composer_id = c.id;")
        repertoire = [Piece(**row) for row in result]
    return repertoire


# Returns an array of Composer namedtuple
def get_all_composers():
    with engine.connect() as con:
        result = con.execute("SELECT * FROM composer;")
        names = [Composer(**row) for row in result]
    return names


# Returns all pieces by selected composer
def get_composer_rep(selected_comp):
    with engine.connect() as con:
        result = con.execute(text(
            "SELECT p.id, p.title FROM piece p INNER JOIN composer c ON p.composer_id = c.id WHERE c.name = :selected_comp ORDER BY p.title;"), selected_comp=selected_comp)
    composer_rep = [Composer_rep(**row) for row in result]
    return composer_rep


# Returns an array of Venue namedtuples
def get_all_venues():
    with engine.connect() as con:
        result = con.execute("SELECT * FROM venue;")
        venues = [Venue(**row) for row in result]
    return venues

    # Using regular tuples:
    # venues.append({"id": row[0], "name": row[1], "address": row[2], "link": row[3]})
    # print(f' **** venues ====> {json.dumps(venues, indent=2)}')

    # OBJECT OF OBJECTS --> each object's key = venue's id, object's value = venue properties
    # object access by key possible
    # venues = create_dict()
    # for row in v_tuples:
    #     venues.add(row.id, ({"name": row[1], "address": row[2], "link": row[3]}))


# returns a program namedtuple for specified event and its performances
def get_program(event):
    performances = get_event_performances(event.id)
    program = Program(event, performances)
    return program


# returns a list of performance namedtuples from a single event
def get_event_performances(event_id):
    with engine.connect() as con:
        result = con.execute(text(
            "SELECT c.name, p.title, pf.notes FROM performance pf  INNER JOIN piece p ON pf.piece_id = p.id INNER JOIN composer c ON p.composer_id = c.id WHERE pf.event_id = :event_id;"), event_id=event_id)
        performances = [Performance(**row) for row in result]
    return performances


# returns a list of all performance namedtuples
def get_all_performances():
    with engine.connect() as con:
        result = con.execute(
            "SELECT c.name, p.title, pf.notes FROM performance pf INNER JOIN piece p ON pf.piece_id = p.id INNER JOIN composer c ON p.composer_id = c.id;")
        performances = [Performance(**row) for row in result]
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


# returns a list of all event namedtuples
def get_all_events():
    with engine.connect() as con:
        result = con.execute(
            "SELECT e.id, v.name, e.day_time FROM event e INNER JOIN venue v ON e.venue_id = v.id;")
        events = [Event(**row) for row in result]
    return events


# def get_all_ensembles():
#     with engine.connect() as con:
#         result = con.execute("SELECT * FROM ensemble;")
#         ensembles = []
#         for row in result:
#             ensembles.append(Ensemble(**row))
#     return ensembles
