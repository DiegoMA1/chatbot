# API
import os
import json
import logging
import requests
import datetime
import locale
import time
from time import sleep

import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status

from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify

from IBM_Whatson import *
from Mongo_Connection import *

from twilio.rest import Client


load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


class GET_MESSAGE(Resource):
    def post(self):
        message = request.json["message"]
        resp = watson_response(watson_create_session(), message)
        #print(resp)
        if resp["response"]["output"]["intents"] == []:
            return jsonify(
                text= resp["response"]["output"]["generic"][0]["text"],
                intent= resp["response"]["output"]["intents"]
            )
        else:
            intent = resp["response"]["output"]["intents"][0]["intent"]
            insertUserData(message, intent, "web")
            if intent == "Postear_Contenido":
                return jsonify(
                    text= resp["response"]["output"]["generic"][0]["text"],
                    intent= intent
                )
            else:
                return jsonify(
                    text= getWatsonResponseDB(intent),
                    intent= intent
                )

class GET_MESSAGE_WHATSAPP(Resource):
    def post(self):
        locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')

        print("message received: " + request.values.get('Body', '').lower())
        print("from: " + request.values.get('From', '').lower())

        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        if request.values.get('Latitude', '').lower()!='' and request.values.get('Longitude', '').lower()!='':
            latitude = request.values.get('Latitude', '').lower()
            longitude = request.values.get('Longitude', '').lower()
            print("Latitude: " + latitude)
            print("Longitude: " + longitude)
            text = latitude + "," + longitude
            response = requests.get(
                url="https://api.predicthq.com/v1/events",
                headers={
                "Authorization": "Bearer " + os.getenv("predicthq_key"),
                "Accept": "application/json"
                },
                params={
                "location_around.origin": text,
                "location_around.offset": "50km"
                }
            )

            res = response.json()

            message = client.messages.create(
                from_='whatsapp:+14155238886',
                body="A continuación tus eventos cercanos:",
                to=request.values.get('From', '').lower()
            )

            for i in range(0,4):
                current = res["results"][i]
                dateStart = datetime.datetime.strptime(current["start"], '%Y-%m-%dT%H:%M:%SZ')
                dateS = dateStart.strftime("%B %d, %Y, %H:%M:%S")
                dateEnd = datetime.datetime.strptime(current["end"], '%Y-%m-%dT%H:%M:%SZ')
                dateE = dateEnd.strftime("%B %d, %Y, %H:%M:%S")
                message = client.messages.create(
                    from_='whatsapp:+14155238886',
                    body= "Evento: " + current["title"] + '\n'  + "Categoría: " + current["category"] +  '\n'  + "Fecha y hora de inicio: " + str(dateS) +  '\n'  +  "Fecha y hora de fin: " + str(dateE) + '\n'  + "Dirección: " + current["entities"][0]["formatted_address"],
                    to=request.values.get('From', '').lower()
                )
                message = client.messages.create(
                    from_='whatsapp:+14155238886',
                    body= "Evento: " + current["title"] + '\n',
                    persistent_action= ["geo:" + str(current["location"][1]) + "," + str(current["location"][0])],
                    to=request.values.get('From', '').lower()
                )

                time.sleep(1)
                
                pass
            
            return

        message = request.values.get('Body', '').lower()
        resp = watson_response(watson_create_session(), message)
        #print(resp)
        if resp["response"]["output"]["intents"] == []:
            message = client.messages.create(
                from_='whatsapp:+14155238886',
                body=resp["response"]["output"]["generic"][0]["text"],
                to=request.values.get('From', '').lower()
            )
        else:
            intent = resp["response"]["output"]["intents"][0]["intent"]
            insertUserData(message, intent, "whatsApp")

            if intent == "Postear_Contenido":
                message = client.messages.create(
                    from_='whatsapp:+14155238886',
                    body=resp["response"]["output"]["generic"][0]["text"],
                    to=request.values.get('From', '').lower()
                )
            elif intent == "Mas_Populares":
                message = client.messages.create(
                    from_='whatsapp:+14155238886',
                    body="A continuación tus imágenes más populares:",
                    to=request.values.get('From', '').lower()
                )
                for img in getWatsonResponseDBWhatsApp(intent):
                    message = client.messages.create(
                        from_='whatsapp:+14155238886',
                        media_url=img,
                        to=request.values.get('From', '').lower()
                    )
            else:
                message = client.messages.create(
                    from_='whatsapp:+14155238886',
                    body=getWatsonResponseDBWhatsApp(intent),
                    to=request.values.get('From', '').lower()
                )

api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1
api.add_resource(GET_MESSAGE_WHATSAPP, '/getMessageWhatsapp')  # Route_2

if __name__ == '__main__':
    app.run(port='5002')
