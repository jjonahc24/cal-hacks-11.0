from flask import Flask
from flask_cors import CORS  
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import routes

load_dotenv()
mongo = PyMongo()

def create_app():
    app = Flask(__name__) 
    
    # when running website in localhost, add http://localhost:3000 to origins
    CORS(app)
    
    app.config['MONGO_URI'] = os.environ.get("MONGO_URI")  # Replace with your MongoDB URI
    print(os.environ.get("MONGO_URI"))
    mongo.init_app(app)
    
    routes.register_routes(app)
    
    return app

create_app().run()
