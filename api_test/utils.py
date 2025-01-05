import random
import string
from randimage import get_random_image
import base64
from datetime import datetime, timedelta
from PIL import Image
import io
import numpy as np


def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))


def ndarray_to_base64(ndarray):
    image = Image.fromarray((ndarray * 255).astype(np.uint8))
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_bytes = buffered.getvalue()
    base64_encoded = base64.b64encode(img_bytes).decode('utf-8')
    return base64_encoded


def get_random_images():
    random_images = [ndarray_to_base64(get_random_image((random.randint(100, 500), random.randint(100, 500)))) for _ in
                     range(random.randint(1, 9))]
    return random_images


def generate_bike_payload(bike_id, start_time, start_coordinate, end_coordinate, interval):
    return ({
                "bike_id": bike_id,
                "coordinate": str(start_coordinate),
                "time": start_time.strftime('%Y-%m-%d %H:%M:%S'),
                "action": True,
                'remain_battery_capacity': random.random()
            }, {
                "bike_id": bike_id,
                "coordinate": str(end_coordinate),
                "time": (start_time + timedelta(minutes=interval)).strftime('%Y-%m-%d %H:%M:%S'),
                "action": False,
                'remain_battery_capacity': random.random()
            })


def generate_scheduler_change_form_payload(bike_id, status):
    return {
        'bike_id': bike_id,
        'status': status,
        'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'proof_materials': get_random_images()
    }


def generate_scheduler_scheduling_log(bike_id, start_time, start_coordinate, end_coordinate, interval):
    return ({
                "bike_id": bike_id,
                "coordinate": str(start_coordinate),
                "time": (start_time - timedelta(minutes=interval)).strftime('%Y-%m-%d %H:%M:%S'),
                "action": True
            }, {
                "bike_id": bike_id,
                "coordinate": str(end_coordinate),
                "time": start_time.strftime('%Y-%m-%d %H:%M:%S'),
                "action": False
            })

if __name__ == '__main__':
    random_images = get_random_images()
    print(random_images)