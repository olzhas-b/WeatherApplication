
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from weatherAPI.newtonraphsonpy import NewtonRaphson

import requests
import collections
import json
import datetime
import sys
# Create your views here.

API_KEY = '73f0a238a0719d86b49fe2c843b1b3ee'#API key for website coinmarket
URL = 'https://api.openweathermap.org/data/2.5/forecast?'#url to access latest cryptocurrency prices and information
PARAMS = {
    'q' : "London",
    'appid' : API_KEY,
}

def convertKtoC(a):
    finder = NewtonRaphson(epsilon=0.001)
    avg = finder.solve(a)
    return avg

def get_weather(request, city):
    if request.method == 'GET':
        if len(city) != 0:
            PARAMS['q'] = city
        response = requests.get(url=URL, params=PARAMS)
        response_json = response.json()
        # return  JsonResponse(response_json, safe=False)
        days = response_json['list']
        d = collections.defaultdict(int)
        country = response_json['city']['country']
        data = []
        # prev = response_json['list'][0]['dt_txt'][0:10]
        prev = ""
        print(prev)
        my_day = {
            'day': any,
            'temp': 0,
            'temp_max': 0,
            'temp_min': 0,
            'country': country
        }
        initial_day = {
            'day': any,
            'temp': 0,
            'temp_max': -1000,
            'temp_min': 1000,
            'country': country
        }
        my_day = initial_day
        for day in days:

            date = day['dt_txt'][0:10]
            if date != prev and len(prev) != 0:
                my_day['temp_min'] = convertKtoC(my_day['temp_min'])
                my_day['temp_max'] = convertKtoC(my_day['temp_max'])
                data.append(my_day)
                my_day = initial_day
                prev = date
            my_day['day'] = day['dt']
            main = day['main']
            temp = main['temp']
            temp_min = min(my_day['temp_min'], main['temp_min'])
            temp_max = max(my_day['temp_max'], main['temp_max'])
            my_day[temp] = temp
            my_day['temp_min'] = temp_min
            my_day['tem_max'] = temp_max
            d[date] += 1
            prev = date
            my_day = {
                'day': date,
                'temp': temp,
                'temp_max': temp_max,
                'temp_min': temp_min,
                'country' : country
            }
                # my_day = json.dumps(my_day)
                # my_day = json.loads(my_day.replace("\'", '"'))
        data.append(my_day)
        response = json.dumps(data)
        response = json.loads(response.replace("\'", '"'))
        return JsonResponse(response, safe=False)
