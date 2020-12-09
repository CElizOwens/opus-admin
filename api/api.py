from api import app
from api.persistence import persistence
import json
import time


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/api/time')
def get_current_time():
    return {'time': time.strftime('%X %x')}


@app.route('/api/venues')
def get_venues():
    venues_json = persistence.get_all_venues()
    return venues_json

    # return {
    #     'venues': [
    #         {
    #             'name': 'Oakland',
    #             'id': '0'
    #         },
    #         {
    #             'name': 'Berkeley',
    #             'id': '1'
    #         },
    #         {
    #             'name': 'Pleasant Hill',
    #             'id': '2'
    #         }
    #     ]
    # }
