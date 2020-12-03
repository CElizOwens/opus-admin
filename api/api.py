from api import app
import time


@app.route('/api/time')
def get_current_time():
    return {'time': time.strftime('%X %x')}
