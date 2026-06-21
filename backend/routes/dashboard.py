import json

def get_dashboard_data():

    with open("data/city_state.json", "r") as file:
        return json.load(file)