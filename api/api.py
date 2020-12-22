from api import app
from api.persistence import persistence
from flask import redirect, request
import time
import json
# import urllib.parse as up


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


# @app.route('api/url')
# def encode(url_str):
#     return up.quote_plus(url_str)


@app.route('/api/time')
def get_current_time():
    return {'time': time.strftime('%X %x')}


@app.route('/api/venues', methods=['GET', 'POST'])
def get_venues():
    if request.method == 'POST':
        req = json.loads(request.data)['data']
        # print(f'req["name"] = {req["name"]}')
        # print(f'******* req = {req[data]} *******\n Type = {type(req)}')
        name = req['name']
        address = req['address']
        link = req['link']
        persistence.insert_venue(name, address, link)
        # redirect('/api/venues')
    return to_json(persistence.get_all_venues())


@app.route('/api/repertoire')
def get_repertoire():
    return to_json(persistence.get_all_performances())


@app.route('/api/programs')
def get_programs():
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
        date_string = event.day_time.strftime('%X %x')
        event_dicts = event._asdict()
        # print(f"*** event as dict -------> {event_dicts}")
        # print(f"*** event dict day_time -------> {event_dicts['day_time']}")
        event_dicts['day_time'] = date_string
        programs.append({"event": event_dicts,
                         "performances": performances_dicts})
    programs_json = json.dumps(programs)
    return programs_json


@app.route('/api/composers')
def get_composers():
    composers_nts = persistence.get_all_composers()
    composers_dicts = [nt._asdict() for nt in composers_nts]
    composers_json = json.dumps(composers_dicts)
    return composers_json


def to_json(nts):
    dicts = [nt._asdict() for nt in nts]
    return json.dumps(dicts)
