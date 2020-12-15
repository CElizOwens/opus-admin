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
    venues_nts = persistence.get_all_venues()
    venues_dicts = [nt._asdict() for nt in venues_nts]
    venues_json = json.dumps(venues_dicts)
    return venues_json


@app.route('/api/composers')
def get_composers():
    composers_nts = persistence.get_all_composers()
    composers_dicts = [nt._asdict() for nt in composers_nts]
    composers_json = json.dumps(composers_dicts)
    return composers_json
