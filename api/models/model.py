from collections import namedtuple

Piece = namedtuple('Piece', ['name', 'title'])  # , 'opus', 'ens_type'])
# Ensemble = namedtuple('Ensemble', ['id', 'ens_type', 'size'])
Event = namedtuple('Event', ['id', 'name', 'day_time'])

Venue = namedtuple('Venue', ['id', 'name', 'address', 'link'])

Performance = namedtuple('Performance', ['name', 'title', 'notes'])

# event -> an Event namedtuple
# performances -> a list of performance namedtuples
Program = namedtuple('Program', ['event', 'performances'])
