from utils import *

conn = psycopg2.connect(**dotenv_values(".env.dev"))
conn.autocommit = True
cur = conn.cursor()

clear(cur)

seed_bike(cur)
seed_bike_status(cur)
seed_reviewed_related(cur)
seed_parking_area(cur)
seed_usage(cur)
seed_scheduling(cur)

conn.close()
