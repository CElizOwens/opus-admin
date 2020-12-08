from api import app
import time


@app.route('/api/time')
def get_current_time():
    return {'time': time.strftime('%X %x')}


@app.route('/api/venues')
def get_venues():
    return {
        'venues': [
            {
                'name': 'Oakland',
                'id': '0'
            },
            {
                'name': 'Berkeley',
                'id': '1'
            },
            {
                'name': 'Pleasant Hill',
                'id': '2'
            }
        ]
    }
