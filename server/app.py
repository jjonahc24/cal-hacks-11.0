from flask import Flask
from flask_cors import CORS

import controllers
import routes
import models

def create_app():
    app = Flask(__name__) 
    
    # when running website in localhost, add http://localhost:3000 to origins
    CORS(app)

    return app

create_app()

