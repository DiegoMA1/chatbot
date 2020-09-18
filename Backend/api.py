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


load_dotenv()

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


class GET_MESSAGE(Resource):
    def post(self):
        resp = watson_response(watson_create_session(), request.json["message"])
        print(resp)
        if resp["response"]["output"]["intents"] == []:
            return jsonify(
                text= resp["response"]["output"]["generic"][0]["text"],
                intent= resp["response"]["output"]["intents"]
            )
        else:
            return jsonify(
                text= resp["response"]["output"]["generic"][0]["text"],
                intent= resp["response"]["output"]["intents"][0]["intent"]
            )
        


api.add_resource(GET_MESSAGE, '/getMessage')  # Route_1

if __name__ == '__main__':
    app.run(port='5002')
