from flask import Blueprint, request, jsonify
from controllers.listings import create

def register_listings(app):
    app.register_blueprint(listing_bp, url_prefix='/listings')

listing_bp = Blueprint('listings', __name__)

@listing_bp.route('/', methods = ['GET'])
def get_listings():
    return jsonify({"data": "Listings!"}), 200

@listing_bp.route('/create', methods = ['POST'])
def create_listing():
    return create(request.get_json())
    

