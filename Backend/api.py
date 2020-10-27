# API
import os
import json
import logging
import requests

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
        print("message received: " + request.values.get('Body', '').lower())
        print("from: " + request.values.get('From', '').lower())

        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        message = request.values.get('Body', '').lower()
        resp = watson_response(watson_create_session(), message)
        #print(resp)
        if resp["response"]["output"]["intents"] == []:
            return jsonify(
                text= resp["response"]["output"]["generic"][0]["text"],
                intent= resp["response"]["output"]["intents"]
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
