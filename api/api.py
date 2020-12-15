from api import app
from api.persistence import persistence
import time
import json


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/api/time')
def get_current_time():
    return {'time': time.strftime('%X %x')}


@app.route('/api/venues')
def get_venues():
    venues_nt = persistence.get_all_venues()
    venues_dicts = []
    for nt in venues_nt:
        venues_dicts.append(nt._asdict())
    venues_json = json.dumps(venues_dicts)
    return venues_json

# return [
#            {
#                'name': 'Oakland',
#                'id': '0'
#            },
#            {
#                'name': 'Berkeley',
#                'id': '1'
#            },
#            {
#                'name': 'Pleasant Hill',
#                'id': '2'
#            }
#        ]
