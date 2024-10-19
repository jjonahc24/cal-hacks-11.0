from flask import Flask
from flask_cors import CORS 
from dotenv import load_dotenv
import os
import routes
import extensions

load_dotenv()

def create_app():
    app = Flask(__name__) 
    
    # when running website in localhost, add http://localhost:3000 to origins
    CORS(app)
    
    app.config['MONGO_URI'] = os.environ.get("MONGO_URI")  # Replace with your MongoDB URI
    extensions.mongo.init_app(app)
    routes.register_routes(app)
    
    return app

create_app().run()
