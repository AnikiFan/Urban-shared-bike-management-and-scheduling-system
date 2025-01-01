from datetime import datetime, timedelta
import base64
import io
from PIL import Image
import random
import numpy as np
import pandas as pd
from dotenv import dotenv_values
import psycopg2
import os
from random import gauss
import string
from randimage import get_random_image
from tqdm import tqdm
from enum import Enum

class Status(Enum):
    NORMAL = 'NORMAL'
    ILLEGAL_PARKING = 'ILLEGAL_PARKING'
    LOW_BATTERY = 'LOW_BATTERY'
    IDLE = 'IDLE'
    LUFLT = 'LUFLT'
    ABNORMAL = 'ABNORMAL'
    TO_MAINTAIN = 'TO_MAINTAIN'
    OUTDATED = 'OUTDATED'
    IN_STORAGE = 'IN_STORAGE'


def get_random_production_date(start=datetime(2015, 1, 1), end=datetime(2016, 8, 1)):
    interval = (end - start).days
    mean = interval // 2
    variance = interval // 12
    return start + timedelta(days=min(int(gauss(mean, variance)), interval))


def get_battery_remaining_capacity():
    return min(max(gauss(0.6, 0.1), 0), 1)


def clear(cursor):
    tables = [
        'bike',
        'parking_area',
        'contain',
        'to_be_reviewed_status',
        'bike_status',
        'to_be_reviewed_proof_material',
        'scheduling',
        'to_be_reviewed',
        'usage'
    ]
    for table in tables:
        cursor.execute(f"TRUNCATE TABLE {table} CASCADE;")


def get_data():
    return pd.read_csv(os.path.join(os.curdir, 'data', 'processed.csv')).astype(
        {'start_time': 'datetime64[ns]', 'end_time': 'datetime64[ns]'}).rename(columns={"bikeid": "bike_id"})


def seed_bike(cursor):
    data = get_data()
    query = """
    INSERT INTO bike(bike_id,production_date,coordinate,battery_remaining_capacity) VALUES (%s,%s,POINT(%s,%s),%s);
    """
    insert_data = data.groupby('bike_id')[['bike_id', 'end_location_x', 'end_location_y', 'end_time']].apply(
        lambda df: df.sort_values(by='end_time', ascending=False).head(1)).iloc[:, :-1].reset_index(drop=True)
    insert_data['production_date'] = pd.to_datetime(insert_data.apply(lambda _: get_random_production_date(), axis=1))
    insert_data['battery_remaining_capacity'] = insert_data.apply(lambda _: get_battery_remaining_capacity(), axis=1)
    cursor.executemany(query, [tuple(row) for row in insert_data[
        ['bike_id', 'production_date', 'end_location_x', 'end_location_y', 'battery_remaining_capacity']].itertuples(
        index=False, name=None)])


def seed_parking_area(cursor):
    NUM = 100
    data = get_data()
    query = """
    INSERT INTO parking_area(name,coordinate,radius) VALUES (%s, POINT(%s,%s),%s);
    """
    insert_data = data.sample(NUM)[['end_location_x', 'end_location_y']] + np.random.randn(NUM, 2) / 10
    insert_data['radius'] = np.random.randint(11, 25, NUM)
    insert_data['name'] = insert_data.apply(lambda _: ''.join(random.choices(string.ascii_letters, k=10)), axis=1)
    cursor.executemany(query, [tuple(row) for row in
                               insert_data[['name', 'end_location_x', 'end_location_y', 'radius']].itertuples(
                                   index=False, name=None)])


def seed_usage(cursor):
    data = get_data()
    query = """
    INSERT INTO usage(bike_id,time,coordinate,action) VALUES (%s,%s,POINT(%s,%s),%s);
    """
    cursor.executemany(query, [tuple(row) for row in
                               data[['bike_id', 'start_time', 'start_location_x', 'start_location_y']].assign(
                                   action=True).itertuples(index=False, name=None)])
    try:
        cursor.executemany(query, [tuple(row) for row in
                                   data[['bike_id', 'end_time', 'end_location_x', 'end_location_y']].assign(
                                       action=False).itertuples(index=False, name=None)])
    except:
        pass


def get_scheduling():
    num = random.randint(0, 10)
    start_time = np.random.rand(num) * timedelta(365) + datetime(2015, 1, 1)
    start_coordinate_x = 121.4 + np.random.randn(num) / 100
    start_coordinate_y = 31.3 + np.random.randn(num) / 100

    delta = np.random.randint(1, 20, num)
    end_time = start_time + timedelta(minutes=1) * delta
    end_coordinate_x = start_coordinate_x + np.random.randn(num) / 1000
    end_coordinate_y = start_coordinate_y + np.random.randn(num) / 1000

    return pd.DataFrame(
        {'start_time': start_time, 'start_coordinate_x': start_coordinate_x, 'start_coordinate_y': start_coordinate_y,
         'end_time': end_time, 'end_coordinate_x': end_coordinate_x, 'end_coordinate_y': end_coordinate_y})


def seed_scheduling(cursor):
    data = get_data()
    query = """
    INSERT INTO scheduling(bike_id,time,coordinate,action) VALUES (%s,%s,POINT(%s,%s),%s);
    """
    for id in tqdm(data.bike_id.unique()):
        scheduling = get_scheduling().assign(bike_id=id)
        cursor.executemany(query, [tuple(row) for row in scheduling[['bike_id', 'start_time', 'start_coordinate_x', 'start_coordinate_y']].assign(
                                       action=True).itertuples(index=False, name=None)])
        cursor.executemany(query, [tuple(row) for row in scheduling[['bike_id', 'end_time', 'end_coordinate_x', 'end_coordinate_y']].assign(
                                       action=False).itertuples(index=False, name=None)])

def get_status():
    tmp = random.random()
    if tmp < 0.4:
        return [Status.NORMAL]
    elif tmp < 0.5:
        return [Status.ABNORMAL]
    else:
        status = list(Status)
        status.remove(Status.NORMAL)
        status.remove(Status.ABNORMAL)
        return random.sample(status, random.randint(1, len(status)))

def seed_bike_status(cursor):
    data = get_data()
    query = """
    INSERT INTO bike_status(bike_id,status) VALUES (%s,%s);
    """
    for id in tqdm(data.bike_id.unique()):
        status = get_status()
        cursor.executemany(query,[(id,s.value) for s in status])


def ndarray_to_base64(ndarray):
    image = Image.fromarray((ndarray*255).astype(np.uint8))
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_bytes = buffered.getvalue()
    base64_encoded = base64.b64encode(img_bytes).decode('utf-8')
    return base64_encoded

def seed_reviewed_related(cursor):
    data = get_data()
    NUM = 1000
    insert_data = data.sample(NUM)[['bike_id','start_time']]
    insert_data.start_time = insert_data.start_time - timedelta(hours=1)
    to_be_reviewed_query = """
    INSERT INTO to_be_reviewed(bike_id,time) VALUES (%s,%s);
    """
    to_be_reviewed_status_query = """
    INSERT INTO to_be_reviewed_status(bike_id,time,status) VALUES (%s,%s,%s);
    """
    to_be_reviewed_proof_material_query = """
    INSERT INTO to_be_reviewed_proof_material(bike_id,time,no,proof_material) VALUES (%s,%s,%s,%s);
    """
    random_images =[ ndarray_to_base64(get_random_image((random.randint(100,500),random.randint(100,500)))) for _ in range(10)]
    for row in tqdm(insert_data.itertuples(index=False),total=len(insert_data)):
        cursor.execute(to_be_reviewed_query, (row.bike_id,row.start_time))
        status = get_status()
        cursor.executemany(to_be_reviewed_status_query, [(row.bike_id,row.start_time,s.value) for s in status])
        cursor.executemany(to_be_reviewed_proof_material_query,[(row.bike_id,row.start_time,no,random_images[no]) for no in range(random.randint(1, 10))])

def seed_contain(cursor):
    cursor.execute("""
INSERT INTO contain (bike_id, parking_area_id)
SELECT b.bike_id, p.parking_area_id
FROM bike b
JOIN parking_area p
ON st_distance(ST_SetSRID(b.coordinate::geometry,4326), ST_SetSRID(p.coordinate::geometry,4326)) <= p.radius;
    """)




if __name__ == '__main__':
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
    # seed_contain(cur)

    conn.close()
