from flask import Blueprint, request, jsonify
import routes

def register_routes(app):
    app.register_blueprint(home_bp, url_prefix='/')
    routes.register_listings(app)
    routes.register_users(app)

home_bp = Blueprint('home', __name__)

@home_bp.route('/', methods = ['GET'])
def home_control():
    return jsonify({"data": "Hello!"}), 200
